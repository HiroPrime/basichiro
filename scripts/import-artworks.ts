/**
 * Walks the local Artworks/Design folder, resizes + compresses every image
 * with sharp, uploads full + thumbnail versions to the `basichiro-art`
 * Supabase Storage bucket, and upserts a row per image into
 * `public.basichiro_artworks`.
 *
 * Usage:  npm run import-artworks
 * Requires .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * ARTWORKS_SOURCE_DIR (defaults to ../Artworks/Design next to this repo).
 */
import { config as loadEnv } from "dotenv";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { COLLECTIONS } from "../src/lib/collections";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });

const SUPPORTED_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"]);
const BUCKET = "basichiro-art";
const FULL_MAX_WIDTH = 2000;
const THUMB_MAX_WIDTH = 640;

const SOURCE_ROOT =
  process.env.ARTWORKS_SOURCE_DIR ||
  path.resolve(process.cwd(), "..", "Artworks", "Design");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type QueuedFile = {
  collectionSlug: string;
  absolutePath: string;
  relativePath: string; // relative to SOURCE_ROOT, used as source_path + title source
};

function titleFromFilename(filename: string): string {
  const base = filename.replace(path.extname(filename), "");
  const cleaned = base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // Strip a lone trailing sequence number like "01" / "5" when there is other text.
  const withoutTrailingNumber = cleaned.replace(/\s+\d{1,3}$/, "");
  return withoutTrailingNumber.length > 0 ? withoutTrailingNumber : cleaned;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function walk(dir: string): Promise<string[]> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    console.warn(`  (skipping missing folder: ${dir})`);
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (SUPPORTED_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function buildQueue(): Promise<QueuedFile[]> {
  const queue: QueuedFile[] = [];
  for (const collection of COLLECTIONS) {
    for (const sourceDir of collection.sourceDirs) {
      const abs = path.join(SOURCE_ROOT, sourceDir);
      const files = await walk(abs);
      for (const absolutePath of files) {
        const relativePath = path.relative(SOURCE_ROOT, absolutePath);
        queue.push({ collectionSlug: collection.slug, absolutePath, relativePath });
      }
    }
  }
  return queue;
}

async function processFile(file: QueuedFile, index: number) {
  const { collectionSlug, absolutePath, relativePath } = file;
  const filename = path.basename(absolutePath);
  const title = titleFromFilename(filename);
  const hash = crypto.createHash("sha1").update(relativePath).digest("hex").slice(0, 10);
  const baseKey = `${collectionSlug}/${slugify(title) || "untitled"}-${hash}`;

  try {
    const sharpOpts = { failOn: "none" as const, limitInputPixels: false as const };
    const source = sharp(absolutePath, sharpOpts).rotate();
    const metadata = await source.metadata();

    const fullBuffer = await sharp(absolutePath, sharpOpts)
      .rotate()
      .resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const thumbBuffer = await sharp(absolutePath, sharpOpts)
      .rotate()
      .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    const fullPath = `${baseKey}.webp`;
    const thumbPath = `${baseKey}-thumb.webp`;

    const [fullUpload, thumbUpload] = await Promise.all([
      supabase.storage.from(BUCKET).upload(fullPath, fullBuffer, {
        contentType: "image/webp",
        upsert: true,
      }),
      supabase.storage.from(BUCKET).upload(thumbPath, thumbBuffer, {
        contentType: "image/webp",
        upsert: true,
      }),
    ]);

    if (fullUpload.error) throw fullUpload.error;
    if (thumbUpload.error) throw thumbUpload.error;

    const imageUrl = supabase.storage.from(BUCKET).getPublicUrl(fullPath).data.publicUrl;
    const thumbUrl = supabase.storage.from(BUCKET).getPublicUrl(thumbPath).data.publicUrl;

    const { error: upsertError } = await supabase.from("basichiro_artworks").upsert(
      {
        collection: collectionSlug,
        title,
        image_url: imageUrl,
        thumb_url: thumbUrl,
        width: metadata.width ?? null,
        height: metadata.height ?? null,
        sort_order: index,
        source_path: relativePath,
      },
      { onConflict: "source_path" }
    );

    if (upsertError) throw upsertError;

    return { ok: true as const };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : String(err) };
  }
}

async function main() {
  console.log(`Scanning ${SOURCE_ROOT} ...`);
  const queue = await buildQueue();
  console.log(`Found ${queue.length} images across ${COLLECTIONS.length} collections.`);

  if (queue.length === 0) {
    console.log("Nothing to import. Check ARTWORKS_SOURCE_DIR and collection sourceDirs.");
    return;
  }

  const CONCURRENCY = 6;
  let done = 0;
  let failed = 0;
  const failures: string[] = [];

  const counters = new Map<string, number>();
  for (const item of queue) {
    counters.set(item.collectionSlug, (counters.get(item.collectionSlug) ?? 0) + 1);
  }

  let cursor = 0;
  async function worker() {
    while (cursor < queue.length) {
      const i = cursor++;
      const file = queue[i];
      const result = await processFile(file, i);
      done++;
      if (!result.ok) {
        failed++;
        failures.push(`${file.relativePath}: ${result.error}`);
      }
      if (done % 25 === 0 || done === queue.length) {
        console.log(`  ${done}/${queue.length} processed (${failed} failed)`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log("\nDone.");
  console.log(`  Imported: ${done - failed}`);
  console.log(`  Failed:   ${failed}`);
  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const f of failures.slice(0, 30)) console.log(`  - ${f}`);
    if (failures.length > 30) console.log(`  ...and ${failures.length - 30} more`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

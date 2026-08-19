// One-off asset pipeline for the Sticker-Zine redesign.
// Copies the needed crops from "Portfolio Site Design/" into public/design/
// as optimized webp, and derives solid-black hover-silhouette masks for the
// 4 skewed nav tiles from their matching gray shape crops.
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SRC_DIR = "C:/Users/jacob/OneDrive/Desktop/NEXUS NODES/Portfolio Site Design";
const OUT_DIR = path.join(__dirname, "..", "public", "design");

const src = (n) => path.join(SRC_DIR, `Portfolio Site Design-${n}.png`);

const IMAGES = [
  { n: "18", out: "logo.webp", width: 500 },
  { n: "06", out: "amy-peek.webp", width: 700 },
  { n: "04", out: "masthead-collage.webp", width: 1400 },
  { n: "07", out: "bio-photo-card.webp", width: 1100 },
  { n: "16", out: "face-sticker-stack.webp", width: 700 },
  { n: "15", out: "me-partner-photo.webp", width: 900 },
  { n: "09", out: "rocket.webp", width: 600 },
  { n: "20", out: "ghost-detective.webp", width: 600 },
  { n: "49", out: "corner-planet.webp", width: 700 },
  { n: "45", out: "pixel-character.webp", width: 400 },
  { n: "28", out: "nav-prime-portal.webp", width: 1000 },
  { n: "26", out: "nav-core-node.webp", width: 800 },
  { n: "29", out: "nav-grimm-fracture.webp", width: 800 },
  { n: "24", out: "nav-save-point.webp", width: 1000 },
  { n: "33", out: "grid-skull.webp", width: 400 },
  { n: "34", out: "grid-potion-playerz.webp", width: 400 },
  { n: "35", out: "grid-mask-green.webp", width: 400 },
  { n: "36", out: "grid-amy-eyes.webp", width: 400 },
  { n: "37", out: "grid-cinnatwist.webp", width: 400 },
  { n: "38", out: "grid-fitstrides.webp", width: 400 },
  { n: "39", out: "grid-fruit-juice.webp", width: 400 },
  { n: "40", out: "grid-burger.webp", width: 400 },
  { n: "41", out: "grid-leaf-logo.webp", width: 400 },
  { n: "42", out: "grid-orange.webp", width: 400 },
  { n: "43", out: "grid-luigi.webp", width: 400 },
  { n: "44", out: "grid-mario-noir.webp", width: 400 },
];

// [shape source num, matching nav tile output width] -> black silhouette mask
const MASKS = [
  { n: "23", out: "nav-mask-prime-portal.webp", width: 1000 },
  { n: "27", out: "nav-mask-core-node.webp", width: 800 },
  { n: "30", out: "nav-mask-grimm-fracture.webp", width: 800 },
  { n: "25", out: "nav-mask-save-point.webp", width: 1000 },
];

async function processImage({ n, out, width }) {
  await sharp(src(n))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_DIR, out));
  console.log("wrote", out);
}

async function processMask({ n, out, width }) {
  const meta = await sharp(src(n)).metadata();
  const alpha = await sharp(src(n)).ensureAlpha().extractChannel("alpha").raw().toBuffer();
  const black = await sharp({
    create: {
      width: meta.width,
      height: meta.height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .raw()
    .toBuffer();

  // Build the full-resolution black silhouette (with the source alpha
  // channel) as a PNG buffer first, then resize in a separate pass —
  // resizing in the same pipeline as a raw+joinChannel source silently
  // no-ops the resize in this sharp version.
  const fullRes = await sharp(black, { raw: { width: meta.width, height: meta.height, channels: 3 } })
    .joinChannel(alpha, { raw: { width: meta.width, height: meta.height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp(fullRes)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(OUT_DIR, out));
  console.log("wrote", out);
}

// The skull only peeks its hat/eyes over the masthead frame corner, so only
// the top portion of the tall source crop is exported.
async function processSkullPeek() {
  const meta = await sharp(src("05")).metadata();
  const cropH = Math.round(meta.height * 0.46);
  await sharp(src("05"))
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_DIR, "skull.webp"));
  console.log("wrote skull.webp (peek crop)");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const img of IMAGES) await processImage(img);
  for (const mask of MASKS) await processMask(mask);
  await processSkullPeek();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

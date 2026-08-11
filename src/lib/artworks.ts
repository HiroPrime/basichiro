import { getSupabase } from "@/lib/supabase";

export type Artwork = {
  id: string;
  collection: string;
  title: string;
  description: string | null;
  image_url: string;
  thumb_url: string;
  width: number | null;
  height: number | null;
  year: number | null;
  tags: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
};

/** Fetch every artwork, newest collections first, then curated sort order. */
export async function getAllArtworks(): Promise<Artwork[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("basichiro_artworks")
    .select("*")
    .order("collection", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getAllArtworks failed:", error.message);
    return [];
  }
  return (data ?? []) as Artwork[];
}

export async function getArtworksByCollection(collection: string): Promise<Artwork[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("basichiro_artworks")
    .select("*")
    .eq("collection", collection)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getArtworksByCollection failed:", error.message);
    return [];
  }
  return (data ?? []) as Artwork[];
}

export async function getFeaturedArtworks(limit = 12): Promise<Artwork[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("basichiro_artworks")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("getFeaturedArtworks failed:", error.message);
    return [];
  }
  return (data ?? []) as Artwork[];
}

function sampleEvenly<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const step = items.length / count;
  return Array.from({ length: count }, (_, i) => items[Math.floor(i * step)]);
}

/**
 * A curated highlight reel pulled evenly across a specific set of collections
 * (e.g. the standout case-study projects), interleaved so pieces from
 * different projects alternate rather than clumping by collection. Used to
 * put the strongest, most personality-driven work up front instead of
 * relying on the generic per-collection `featured` flag.
 */
export async function getBestWorkArtworks(
  collectionSlugs: string[],
  perCollection = 5
): Promise<Artwork[]> {
  const lists = await Promise.all(collectionSlugs.map((slug) => getArtworksByCollection(slug)));
  const sampled = lists.map((list) => sampleEvenly(list, perCollection));
  const maxLen = Math.max(0, ...sampled.map((l) => l.length));
  const interleaved: Artwork[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (const list of sampled) {
      if (list[i]) interleaved.push(list[i]);
    }
  }
  return interleaved;
}

/** Collections that actually have at least one imported artwork, with counts. */
export async function getCollectionCounts(): Promise<Record<string, number>> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("basichiro_artworks").select("collection");

  if (error) {
    console.error("getCollectionCounts failed:", error.message);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const key = (row as { collection: string }).collection;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

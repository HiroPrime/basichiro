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

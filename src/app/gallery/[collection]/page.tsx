import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import GalleryGrid from "@/components/GalleryGrid";
import { getArtworksByCollection } from "@/lib/artworks";
import { COLLECTIONS, getCollection, GROUPS } from "@/lib/collections";

export const revalidate = 300;

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.title} | BasicHiro`,
    description: collection.blurb,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const artworks = await getArtworksByCollection(slug);

  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />
      <section
        className="pt-36 md:pt-44 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto"
        style={{ ["--collection-accent" as string]: collection.accent }}
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> All collections
        </Link>

        <p
          className="font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase"
          style={{ color: collection.accent }}
        >
          {GROUPS[collection.group].title}
          {collection.era ? ` · ${collection.era}` : ""}
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white mb-4">
          {collection.title}
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mb-4">{collection.blurb}</p>
        <p className="text-gray-600 text-xs uppercase tracking-widest mb-14">
          {artworks.length} {artworks.length === 1 ? "piece" : "pieces"}
        </p>

        {artworks.length > 0 ? (
          <GalleryGrid artworks={artworks} />
        ) : (
          <p className="text-gray-500 text-sm uppercase tracking-widest py-24 text-center border border-dashed border-[#222] rounded-sm">
            Nothing imported for this collection yet.
          </p>
        )}
      </section>
    </main>
  );
}

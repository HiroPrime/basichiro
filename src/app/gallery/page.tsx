import type { Metadata } from "next";
import Header from "@/components/Header";
import GalleryGrid from "@/components/GalleryGrid";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllArtworks } from "@/lib/artworks";
import { COLLECTIONS } from "@/lib/collections";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Gallery | BasicHiro",
  description: "The full BasicHiro archive — branding, illustration, and character work from 2017 to now.",
};

export default async function GalleryPage() {
  const artworks = await getAllArtworks();

  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />
      <section className="pt-36 md:pt-44 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase text-center">
          The Archive
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white text-center mb-4">
          Gallery
        </h1>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-14">
          {artworks.length > 0
            ? `${artworks.length} pieces across ${COLLECTIONS.length} collections, from early client logos to the newest sketches.`
            : "The gallery import hasn't run yet — this fills in once artworks are ingested."}
        </p>

        <GalleryGrid artworks={artworks} collections={COLLECTIONS} />
      </section>

      <section className="py-24 px-6 md:px-12 bg-black border-t border-[#1a1a1e] flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase ink-text text-white mb-4">
            Want the next drop first?
          </h2>
          <NewsletterForm compact />
        </div>
      </section>
    </main>
  );
}

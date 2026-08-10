import type { Metadata } from "next";
import Header from "@/components/Header";
import SiteCard from "@/components/SiteCard";
import { NEXUS_SITES } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Sites I've Built | BasicHiro",
  description: "Live sites built through Nexus Nodes — from an original webcomic to ecosystem hubs.",
};

export default function SitesPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />
      <section className="pt-36 md:pt-44 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase text-center">
          Beyond Art
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white text-center mb-4">
          Sites I&apos;ve Built
        </h1>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-14">
          Design doesn&apos;t stop at the page — these are live products built end-to-end through
          Nexus Nodes: Next.js, Supabase, and a lot of late nights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NEXUS_SITES.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </div>

        <p className="text-gray-600 text-xs uppercase tracking-widest text-center mt-16">
          More projects (KidQuest, My Character, Sticker Generator, Webtoon Maker, and others) are in
          development and will land here once deployed.
        </p>
      </section>
    </main>
  );
}

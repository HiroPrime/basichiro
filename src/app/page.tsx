import Link from "next/link";
import { ArrowDown, Sparkles, BookOpen, LayoutGrid } from "lucide-react";
import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import RevealSection from "@/components/RevealSection";
import GalleryGrid from "@/components/GalleryGrid";
import NewsletterForm from "@/components/NewsletterForm";
import SiteCard from "@/components/SiteCard";
import { getFeaturedArtworks } from "@/lib/artworks";
import { COLLECTIONS, GROUPS, type CollectionGroup } from "@/lib/collections";
import { NEXUS_SITES } from "@/lib/sites";

export const revalidate = 300;

const GROUP_ORDER: CollectionGroup[] = [
  "foundations",
  "brand-builds",
  "character-fan-art",
  "personal-experimental",
  "production-products",
];

export default async function Home() {
  const featured = await getFeaturedArtworks(16);

  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans selection:bg-[#b64bff] selection:text-black">
      <Header />

      {/* HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07070a]">
        <HeroCanvas />
        <div className="absolute inset-0 vignette-overlay z-10" />

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl">
          <p className="text-[#22d3ee] font-black tracking-[0.5em] text-[10px] md:text-sm mb-6 uppercase">
            Character-Driven Brand Designer
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase ink-text leading-[0.9]">
            Basic<span className="text-[#b64bff]">Hiro</span>
          </h1>
          <p className="text-gray-300 text-base md:text-2xl font-bold leading-relaxed mt-8 max-w-2xl">
            I take original and fan characters and build them a whole world —
            illustration, packaging, apparel, and story.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-3 bg-[#b64bff] text-black px-10 py-4 md:px-12 md:py-5 rounded-sm font-black uppercase tracking-widest text-xs md:text-base hover:bg-[#c96bff] hover:scale-105 transition-all skew-cta"
            >
              <span className="flex items-center gap-3">
                <LayoutGrid size={20} /> See the Work
              </span>
            </Link>
            <a
              href="https://grimmfracture.nexus"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white px-10 py-4 md:px-12 md:py-5 rounded-sm font-black uppercase tracking-widest text-xs md:text-base hover:border-white transition-all skew-cta"
            >
              <span className="flex items-center gap-3">
                <BookOpen size={20} /> Read Grimm Fracture
              </span>
            </a>
          </div>

          <div className="absolute -bottom-28 animate-bounce text-gray-600 hidden md:block">
            <ArrowDown size={28} />
          </div>
        </div>
      </section>

      {/* NICHE STATEMENT */}
      <RevealSection className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#07070a] flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase ink-text text-white mb-8">
            Not just a designer. <span className="text-[#b64bff]">A world-builder.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed">
            Since 2017 the throughline has stayed the same: take a character — original or borrowed
            — and give it a bold, graphic treatment, then push it all the way into something real.
            Packaging. Apparel. Stickers. Trading cards. A magazine. A webcomic with its own universe.
            AI is part of the toolkit now, but it&apos;s an accelerant, not the artist.
          </p>
        </div>
      </RevealSection>

      {/* FEATURED WORK */}
      <RevealSection className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-black border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase">
                Featured
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase ink-text text-white">
                Recent & Favorite Work
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              View full gallery →
            </Link>
          </div>
          {featured.length > 0 ? (
            <GalleryGrid artworks={featured} />
          ) : (
            <p className="text-gray-500 text-sm uppercase tracking-widest py-16 text-center border border-dashed border-[#222] rounded-sm">
              Gallery import pending — run <code className="text-[#22d3ee]">npm run import-artworks</code> to
              populate this section.
            </p>
          )}
        </div>
      </RevealSection>

      {/* COLLECTIONS OVERVIEW */}
      <RevealSection className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-[#07070a] border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase text-center">
            The Archive
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase ink-text text-white text-center mb-14">
            Years of Work, Organized
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROUP_ORDER.map((group) => {
              const items = COLLECTIONS.filter((c) => c.group === group);
              return (
                <div key={group} className="border border-[#1a1a1e] rounded-sm p-6 bg-[#0c0c10]">
                  <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2">
                    {GROUPS[group].title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{GROUPS[group].blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/gallery/${c.slug}`}
                        className="text-[10px] font-black uppercase px-2.5 py-1 border rounded-full tracking-widest transition-colors hover:bg-white/5"
                        style={{ borderColor: `${c.accent}66`, color: c.accent }}
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      {/* GRIMM FRACTURE SPOTLIGHT */}
      <RevealSection className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-black border-t border-[#1a1a1e] flex flex-col items-center text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 30%, #8b0000 0%, transparent 60%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#ff4444] font-black tracking-[0.4em] text-[10px] md:text-xs mb-6 uppercase">
            Flagship IP
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white mb-6">
            Grimm <span className="text-[#8b0000]">Fracture</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto">
            An original webcomic series with its own series bible, cast, and an AI-assisted
            production pipeline. The clearest proof that character work here goes all the way to a
            finished world.
          </p>
          <a
            href="https://grimmfracture.nexus"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all skew-cta"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={18} /> Visit Grimm Fracture
            </span>
          </a>
        </div>
      </RevealSection>

      {/* NEXUS SITES TEASER */}
      <RevealSection className="relative w-full py-16 md:py-24 px-6 md:px-12 bg-[#07070a] border-t border-[#1a1a1e]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase">
                Beyond Art
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase ink-text text-white">
                Sites I&apos;ve Built
              </h2>
            </div>
            <Link
              href="/sites"
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEXUS_SITES.slice(0, 2).map((site) => (
              <SiteCard key={site.slug} site={site} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* NEWSLETTER */}
      <RevealSection className="relative w-full py-24 px-6 md:px-12 bg-black border-t border-[#1a1a1e] flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase ink-text text-white mb-6">
            Get new work <span className="text-[#b64bff]">first.</span>
          </h2>
          <p className="text-gray-400 font-medium mb-10 text-sm md:text-base">
            New pieces, new drops, new Grimm Fracture pages. No spam.
          </p>
          <NewsletterForm />
        </div>
      </RevealSection>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#030304] py-16 md:py-20 px-8 text-center relative border-t border-[#1a1a1e]">
      <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase ink-text leading-[0.85] text-[#1c1c22]">
        BASICHIRO
      </h1>
      <p className="text-[#b64bff] font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mt-4">
        A Nexus Nodes Original
      </p>
      <p className="text-gray-600 font-bold tracking-[0.2em] uppercase text-[8px] md:text-[10px] mt-4">
        Character-driven brand design & illustration
      </p>
    </footer>
  );
}

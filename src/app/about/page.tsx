import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealSection from "@/components/RevealSection";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About | BasicHiro",
  description:
    "BasicHiro is a character-driven brand designer — original and fan characters built out into full worlds: illustration, packaging, apparel, and story.",
};

const TIMELINE = [
  {
    era: "2017",
    title: "Foundations",
    body: "Logo and identity work for small clients — Crazy Talk, OneShot, Noah's Ark, Sophia Avocado. Learning to make a mark mean something in one glance.",
    accent: "#5b7c99",
  },
  {
    era: "2018",
    title: "Packaging & Illustration",
    body: "First packaging systems (Mooless, Fruiti Gummi) and library rebrands, alongside character illustration like Majora's Mask and the start of a long Pokémon fan-art habit.",
    accent: "#c78a3b",
  },
  {
    era: "2019",
    title: "Range & Repetition",
    body: "A 30-day sticker challenge, more logo work, and the Astoria identity — building range and speed through repetition.",
    accent: "#2e8b8b",
  },
  {
    era: "2020-2023",
    title: "CinnaTwist & FitStrides",
    body: "Two full brand builds taken from concept to real product: apparel lines, product photography, ad campaigns, and merch — proof the work could carry a business, not just a page.",
    accent: "#ff5ea3",
  },
  {
    era: "2024-2025",
    title: "Skulls, Masks & AI",
    body: "The most personal chapter yet: Skulls, Mask Digital Art, and raw Scribble Art sit next to trading cards, sticker sheets, a magazine brand (Potion Playerz), and the first AI-assisted pieces — tracing and collage used as an accelerant, not a shortcut.",
    accent: "#8b5cf6",
  },
  {
    era: "2025-2026",
    title: "Grimm Fracture",
    body: "An original webcomic IP with its own series bible and an AI-assisted production pipeline — everything before this pointed here: character design pushed all the way into a full, ongoing world.",
    accent: "#8b0000",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />

      <section className="pt-36 md:pt-44 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase">About</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white mb-8">
          Character-Driven <span className="text-[#b64bff]">Brand Designer</span>
        </h1>
        <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-6">
          I&apos;m BasicHiro. Since 2017 the throughline has stayed the same: take a character —
          original or borrowed — give it a bold, graphic treatment, and push it all the way into
          something real. Packaging. Apparel. Stickers. Trading cards. A magazine. A webcomic with
          its own universe.
        </p>
        <p className="text-gray-500 text-sm md:text-lg leading-relaxed">
          AI is part of the toolkit now — tracing, collage, production speed on Grimm Fracture — but
          it doesn&apos;t replace the hand on the page. Direction, design, and final craft stay mine.
        </p>
      </section>

      <RevealSection className="px-6 md:px-12 max-w-4xl mx-auto pb-24">
        <div className="relative border-l-2 border-[#1a1a1e] ml-3 md:ml-6">
          {TIMELINE.map((step) => (
            <div key={step.era} className="relative pl-8 md:pl-12 pb-14 last:pb-0">
              <span
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#07070a]"
                style={{ backgroundColor: step.accent }}
              />
              <p
                className="font-black tracking-[0.35em] text-[10px] md:text-xs uppercase mb-2"
                style={{ color: step.accent }}
              >
                {step.era}
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
                {step.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">{step.body}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <section className="py-24 px-6 md:px-12 bg-black border-t border-[#1a1a1e] flex flex-col items-center text-center">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase ink-text text-white mb-4">
            Follow the next chapter
          </h2>
          <NewsletterForm compact />
        </div>
      </section>
    </main>
  );
}

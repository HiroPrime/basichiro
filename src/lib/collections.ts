export type CollectionGroup =
  | "foundations"
  | "brand-builds"
  | "character-fan-art"
  | "personal-experimental"
  | "production-products";

export type Collection = {
  slug: string;
  title: string;
  blurb: string;
  /** Hex accent color used for this collection's theming throughout the site. */
  accent: string;
  group: CollectionGroup;
  era?: string;
  /**
   * Folders under Artworks/Design (relative, Windows-style backslashes ok)
   * that feed this collection. Walked recursively by scripts/import-artworks.ts.
   */
  sourceDirs: string[];
};

export const GROUPS: Record<CollectionGroup, { title: string; blurb: string }> = {
  foundations: {
    title: "Foundations (2017-2019)",
    blurb: "Early client logos, packaging, and illustration — where the fundamentals were built.",
  },
  "brand-builds": {
    title: "Brand Builds",
    blurb: "Full identity systems taken from concept to real, sellable products.",
  },
  "character-fan-art": {
    title: "Character & Fan Art",
    blurb: "Character-first illustration — original designs and beloved IP reimagined.",
  },
  "personal-experimental": {
    title: "Personal & Experimental",
    blurb: "Unfiltered, expressive, and AI-augmented work made for its own sake.",
  },
  "production-products": {
    title: "Production & Products",
    blurb: "Trading cards, stickers, games, and social systems built for shipping.",
  },
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "client-design-2017",
    title: "Graphic Design — 2017",
    blurb: "Logo and identity work for early clients: Crazy Talk, OneShot, Noah's Ark, and more.",
    accent: "#5b7c99",
    group: "foundations",
    era: "2017",
    sourceDirs: ["Graphic Design 2017"],
  },
  {
    slug: "client-design-2018",
    title: "Design — 2018",
    blurb: "Packaging, branding, and illustration for a run of small business clients.",
    accent: "#c78a3b",
    group: "foundations",
    era: "2018",
    sourceDirs: ["Design 2018"],
  },
  {
    slug: "client-design-2019",
    title: "Design — 2019",
    blurb: "Logos, sticker challenges, and character illustration heading into the next era.",
    accent: "#2e8b8b",
    group: "foundations",
    era: "2019",
    sourceDirs: ["Design 2019"],
  },
  {
    slug: "cinnatwist",
    title: "CinnaTwist",
    blurb: "A full fruit-themed apparel brand — logo, packaging, product photography, and ad campaigns.",
    accent: "#ff5ea3",
    group: "brand-builds",
    sourceDirs: ["CinnaTwist"],
  },
  {
    slug: "fitstrides",
    title: "FitStrides",
    blurb: "Merch and ad creative for a fitness-apparel brand.",
    accent: "#39ff88",
    group: "brand-builds",
    sourceDirs: ["FitStrides"],
  },
  {
    slug: "fireplume",
    title: "FirePlume",
    blurb: "A small, bold brand mark and supporting art.",
    accent: "#ff6a2b",
    group: "brand-builds",
    sourceDirs: ["FirePlume"],
  },
  {
    slug: "potion-playerz",
    title: "Potion Playerz Magazine",
    blurb: "A branded magazine and merch line — mockups, hats, hoodies, and layout design.",
    accent: "#a855f7",
    group: "brand-builds",
    sourceDirs: ["Designs 2024_2025/Potion Playerz Magazine"],
  },
  {
    slug: "pokedex-project",
    title: "The Pokédex Project",
    blurb: "A full digital illustration series reimagining the original Pokédex, one entry at a time.",
    accent: "#e3350d",
    group: "character-fan-art",
    sourceDirs: ["Digital Drawings/Pokemon", "Designs 2024_2025/Pokemon"],
  },
  {
    slug: "skulls",
    title: "Skulls",
    blurb: "Stylized character skull portraits — bold, graphic, and a little dangerous.",
    accent: "#8b0000",
    group: "character-fan-art",
    sourceDirs: ["Designs 2024_2025/Skulls"],
  },
  {
    slug: "mask-digital-art",
    title: "Mask Digital Art",
    blurb: "Pop-culture character mashups rebuilt as bold, graphic mask portraits.",
    accent: "#8b5cf6",
    group: "character-fan-art",
    sourceDirs: ["Designs 2024_2025/Mask Digital Art"],
  },
  {
    slug: "scribble-art",
    title: "Scribble Art",
    blurb: "Raw, unfiltered, personal pieces — the most direct look at what's going on in my head.",
    accent: "#d97676",
    group: "personal-experimental",
    sourceDirs: ["Designs 2024_2025/Scribble Art", "Designs 2024_2025/Originals"],
  },
  {
    slug: "ai-assisted-art",
    title: "AI-Assisted Art",
    blurb: "Tracing, collage, and generative experiments — AI as an accelerant, not the artist.",
    accent: "#22d3ee",
    group: "personal-experimental",
    sourceDirs: [
      "Designs 2024_2025/AI Trace Art",
      "Designs 2024_2025/AI Image collages",
      "Designs 2024_2025/AI addition Sticker",
    ],
  },
  {
    slug: "trading-cards",
    title: "Collectable Art Cards",
    blurb: "A full trading-card series, illustrated and laid out sheet by sheet.",
    accent: "#d4af37",
    group: "production-products",
    sourceDirs: ["Designs 2024_2025/Collectable Art Cards"],
  },
  {
    slug: "card-game-concepts",
    title: "Card Game Concepts",
    blurb: "Original tabletop game concepts — Make-A-Sandwich, Color Collector, and more.",
    accent: "#a3e635",
    group: "production-products",
    sourceDirs: [
      "Designs 2024_2025/Make_A-Sandwich Card Game",
      "Designs 2024_2025/Color Collector Card Game",
    ],
  },
  {
    slug: "stickers",
    title: "Stickers",
    blurb: "Sticker sheets and standalone designs, built for print and pass-around.",
    accent: "#f472b6",
    group: "production-products",
    sourceDirs: ["Designs 2024_2025/Stickers"],
  },
  {
    slug: "merch-graphics",
    title: "Merch Graphics",
    blurb: "Apparel-ready graphics built for print.",
    accent: "#ea580c",
    group: "production-products",
    sourceDirs: ["Designs 2024_2025/T-Shirt Designs"],
  },
  {
    slug: "social-content",
    title: "Social Content",
    blurb: "Social post systems and campaign templates.",
    accent: "#38bdf8",
    group: "production-products",
    sourceDirs: ["Designs 2024_2025/Social"],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function collectionsByGroup(group: CollectionGroup): Collection[] {
  return COLLECTIONS.filter((c) => c.group === group);
}

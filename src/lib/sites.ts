export type NexusSite = {
  slug: string;
  title: string;
  blurb: string;
  url: string;
  accent: string;
  tags: string[];
  screenshot: string | null;
  status: "live" | "in-development";
};

export const NEXUS_SITES: NexusSite[] = [
  {
    slug: "grimm-fracture",
    title: "Grimm Fracture",
    blurb:
      "An original web comic series — a shattered timeline, two Fractured heroes, and an AI-assisted production pipeline built to ship pages fast without losing the hand-drawn craft.",
    url: "https://grimmfracture.nexus",
    accent: "#8b0000",
    tags: ["Next.js", "Supabase", "Webcomic", "AI-assisted"],
    screenshot: "/sites/grimm-fracture.png",
    status: "live",
  },
  {
    slug: "core-node",
    title: "Core Node",
    blurb: "A constellation-style hub for the Nexus Nodes ecosystem — a living map of every site and project.",
    url: "https://corenode.nexus",
    accent: "#ff5f1f",
    tags: ["Next.js", "Canvas", "Hub"],
    screenshot: "/sites/core-node.png",
    status: "live",
  },
  {
    slug: "nexus-prime",
    title: "Nexus Prime",
    blurb: "A retro RPG-styled portfolio shell — the original front door to the Nexus Nodes universe.",
    url: "https://nexusprime.nexus",
    accent: "#39ff14",
    tags: ["Next.js", "Supabase", "RPG UI"],
    screenshot: "/sites/nexus-prime.png",
    status: "live",
  },
  {
    slug: "prime-portal",
    title: "Prime Portal",
    blurb: "A glass-and-holo dashboard project with its own dedicated backend and scheduled data syncs.",
    url: "https://primeportal.nexus",
    accent: "#38bdf8",
    tags: ["Next.js", "Dashboard", "Cron"],
    screenshot: "/sites/prime-portal.png",
    status: "live",
  },
];

# BasicHiro

Character-driven brand designer — an art and personality portfolio built on the Nexus Nodes stack.

Original and fan characters, built out into full worlds: illustration, packaging, apparel, and story. This site collects that work — from 2017 client logos through the CinnaTwist and FitStrides brand builds to the 2024-2025 Skulls, Mask Digital Art, and AI-assisted collections — alongside [Grimm Fracture](https://grimmfracture.nexus), an original webcomic IP, and the other sites built through Nexus Nodes.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- [Supabase](https://supabase.com) (shared "Nexus Prime" project) for auth, newsletter, visitor stats, and the artworks gallery
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals and gallery transitions
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in the shared Nexus Supabase credentials (ask in the Nexus Nodes workspace if you don't have them).

## Importing artwork

The raw art library lives outside this repo (`../Artworks`, never committed — see `.gitignore`). To (re)populate the gallery:

1. Make sure `.env.local` has `SUPABASE_SERVICE_ROLE_KEY` and `ARTWORKS_SOURCE_DIR` set.
2. Run:

```bash
npm run import-artworks
```

This walks the folders defined in `src/lib/collections.ts`, resizes/compresses each image with `sharp`, uploads full + thumbnail versions to the `basichiro-art` Supabase Storage bucket, and upserts a row per image into the `basichiro_artworks` table.

## Project structure

- `src/app` — routes (home, `/gallery`, `/gallery/[collection]`, `/about`, `/sites`, API routes)
- `src/components` — shared UI (gallery grid, lightbox, auth modal, hero canvas backdrop)
- `src/lib/collections.ts` — the collection taxonomy + accent colors + source folder mapping
- `src/lib/artworks.ts` — Supabase data access for the gallery
- `scripts/import-artworks.ts` — one-off/rerunnable ingestion script

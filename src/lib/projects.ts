export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  /** Hex accent color — should match the associated collection's accent. */
  accent: string;
  /** Slug into COLLECTIONS / basichiro_artworks.collection, used to pull supporting images. */
  collectionSlug: string;
  /** Short kicker describing what kind of project this was. */
  type: string;
  /** Opening framing paragraph(s) — the brief / starting point. */
  brief: string;
  /** Long-form narrative broken into headed sections. */
  sections: ProjectSection[];
  /** Closing thought that wraps up the case study. */
  closing: string;
};

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    slug: "cinnatwist",
    title: "CinnaTwist",
    tagline: "A fruit-colored apparel brand, built from the ground up as its own business.",
    accent: "#ff5ea3",
    collectionSlug: "cinnatwist",
    type: "Brand Build · Personal Apparel Brand",
    brief:
      "CinnaTwist wasn't client work — it was a business I built for myself, from the name down to the last hex code. The goal from day one was simple: make something fun and colorful, and make it real. Not a moodboard, not a portfolio piece. An actual brand someone could buy a shirt from.",
    sections: [
      {
        heading: "Starting with fruit",
        body:
          "The first designs were hand-made fruit patterns — literal citrus wedges, berry clusters, tropical slices, drawn and arranged by hand before anything else existed. There was no logo yet, no product line, just the instinct that fruit was fun, graphic, and endlessly remixable. Those early patterns weren't a one-off gimmick, though — they became the seed of a much larger pattern library that kept growing as the brand did, giving every future drop something to pull from instead of starting from a blank page each time.",
      },
      {
        heading: "The color system, not just the color palette",
        body:
          "The single most important design decision in CinnaTwist was turning real fruit color into an actual system. Citrus yellows and oranges, berry magentas and violets, tropical greens and pinks — pulled straight from the fruit itself and then organized into a master palette that everything else had to answer to. That system is what let a pattern, a packaging insert, and a t-shirt colorway all feel like they came from the same place, and it's what made pieces mix-and-match instead of feeling like a pile of unrelated drops. Once the palette existed as a system rather than a vibe, differentiating products got easy: swap the fruit, keep the logic, and the brand still reads as CinnaTwist.",
      },
      {
        heading: "Going direct-to-customer, on purpose",
        body:
          "CinnaTwist ships through print-on-demand and drop-shipping — no warehouse, no inventory sitting in a garage, no manufacturing overhead to manage before a single shirt sells. That wasn't a limitation to work around, it was the plan: keep the business lean enough that the actual job could stay design plus storefront, and let fulfillment partners handle production and shipping. It's a model built for someone doing the design work solo and wanting the brand to live or die on the strength of the art and the system behind it, not on inventory risk.",
      },
      {
        heading: "One thing CinnaTwist is not",
        body:
          "Worth saying plainly: CinnaTwist is an apparel brand, full stop. The fruit theme runs through every pattern and color choice, but there's no snack line, no food product, nothing edible attached to the name. The fruit is a design language — a way of thinking about color, shape, and pattern — not a category of product.",
      },
    ],
    closing:
      "CinnaTwist is the proof-of-concept for treating a personal creative idea like an actual brand: a visual system disciplined enough to scale, and a business model light enough to actually ship.",
  },
  {
    slug: "fitstrides",
    title: "FitStrides",
    tagline: "Fitness and outdoor-life apparel that refuses to take itself too seriously.",
    accent: "#39ff88",
    collectionSlug: "fitstrides",
    type: "Brand Build · Personal Apparel Brand",
    brief:
      "FitStrides is a brand built to support outdoor activity and fitness — hiking, running, whatever gets someone moving — and to celebrate what that movement does for a person's health. It's a second run at building a personal apparel brand direct-to-consumer, using the same lean, no-inventory playbook that CinnaTwist proved out, aimed at a completely different audience.",
    sections: [
      {
        heading: "Same playbook, new territory",
        body:
          "After CinnaTwist, the question was whether the personal-brand approach — design it, build the storefront, ship through print-on-demand and drop-shipping — could work a second time, in a market with its own established visual conventions. FitStrides became that test: a brand meant to genuinely serve a fitness and outdoors community, not just recycle a formula.",
      },
      {
        heading: "Rejecting the default fitness-wear tone",
        body:
          "Most fitness and outdoor apparel branding defaults to serious, aggressive, grind-culture visuals — hard edges, dark palettes, intensity as the whole personality. FitStrides deliberately goes the other way. It borrows the same fun, colorful, playful energy that drives CinnaTwist and applies it to hiking trails and morning runs instead of fruit patterns. The bet underneath that choice is simple: activity and fitness should feel good, not punishing, and a brand's tone should say that before a single product description does.",
      },
      {
        heading: "Health and movement as the throughline",
        body:
          "Every piece of FitStrides ties back to the idea that different outdoor activities each bring their own benefit to a person's health, and the brand's job is to make showing up for any of them feel approachable and a little joyful rather than like a chore. That's the throughline connecting the apparel graphics, the color choices, and the overall attitude of the brand.",
      },
    ],
    closing:
      "FitStrides is what happens when a color-forward, fun-first design instinct meets a category built on intensity — and holds its ground instead of blending in.",
  },
  {
    slug: "potion-playerz",
    title: "Potion Playerz Magazine",
    tagline: "An independent print magazine built to celebrate indie game developers — two issues deep.",
    accent: "#a855f7",
    collectionSlug: "potion-playerz",
    type: "Independent Print Publication",
    brief:
      "Potion Playerz is a real, produced magazine — not a concept deck, not a mockup exercise. Two full issues shipped. I owned the project and built the concept together with my wife, with one goal driving every decision: give indie video game developers a fun, empowering platform that celebrates the work they're doing.",
    sections: [
      {
        heading: "A platform, not just a publication",
        body:
          "Indie developers rarely get the glossy magazine treatment — that's usually reserved for the biggest studios and biggest releases. Potion Playerz flips that, treating indie devs as worth celebrating on their own terms: features, spreads, and a whole publication built around the idea that making a game solo or in a small team is worth genuine fanfare.",
      },
      {
        heading: "Designing a layout and type system that had to last",
        body:
          "The hardest design problem wasn't any single page — it was building a layout and typography system that could hold together across an entire issue, then hold together again across a second issue, and then extend cleanly into a merch line on top of that. Grids, type hierarchy, and cover treatment all had to be considered as a system from the start: consistent enough to feel like one magazine issue after issue, flexible enough to let each feature and each cover still feel distinct. That system is what let the same visual language stretch from an interior editorial spread all the way to a hat or a hoodie without breaking.",
      },
      {
        heading: "From pages to product",
        body:
          "Because the layout and brand system were built to travel, Potion Playerz didn't stop at the printed page. The same type treatment and visual identity extended into a merch line — hats, hoodies, and product mockups — turning the magazine's editorial identity into something wearable, and giving the whole project a life outside of just the two printed issues.",
      },
    ],
    closing:
      "Potion Playerz is proof that an independent magazine can be built end-to-end — concept, editorial design, and merch — around genuinely celebrating a community that deserved the spotlight.",
  },
  {
    slug: "skulls",
    title: "Skulls",
    tagline: "A personal illustration series about mortality, transformation, and the edge worth pushing against.",
    accent: "#8b0000",
    collectionSlug: "skulls",
    type: "Personal Illustration Series",
    brief:
      "Skulls is personal work, not client work — a series I keep coming back to because the subject matter means something to me. Skulls carry a lot of weight as imagery: mortality, transformation and rebirth, facing fear, an edge to push against. I don't come to this series with a client brief telling me what to make. I come to it with whatever's sitting underneath, and let the imagery carry it.",
    sections: [
      {
        heading: "Why skulls, specifically",
        body:
          "The skull is one of the oldest symbols there is, and I keep finding new reasons to draw it. Sometimes it's about mortality in the plainest sense. Sometimes it's transformation — the idea that something has to end, or break down, before something else can take its place. Sometimes it's about facing fear head-on instead of looking away from it. And sometimes it's just about having an edge to push against, a subject dark enough that it demands something bolder out of the linework than a softer piece would. I don't think any single skull in this series is about only one of those things — they overlap, piece to piece.",
      },
      {
        heading: "One rule, held across every piece",
        body:
          "Across the entire series there's a consistent stylistic rule I hold to: bold, graphic linework and shading, no matter what else changes about a given piece. That constraint is what makes the series read as one body of work instead of a scattered pile of skull drawings — the technique is the throughline even when the concept behind each piece is different.",
      },
      {
        heading: "Real variety inside that constraint",
        body:
          "Inside that one held constant, there's genuine range. Each skull in this series explores a different theme, a different concept, sometimes a different material or texture treatment entirely. The bold-linework rule doesn't flatten the series into sameness — it's the frame that lets each individual piece go somewhere different without losing the thread back to the rest of the collection.",
      },
      {
        heading: "Watching the technique evolve",
        body:
          "Because this is a series I've returned to over time rather than a one-off, it also doubles as a visible record of skill growth. Line confidence, shading control, how ambitious the material and texture treatments get — all of it shifts noticeably from the earlier pieces to the more recent ones. It's less a fixed portfolio piece and more a running log of getting better at the same hard subject, piece after piece.",
      },
    ],
    closing:
      "Skulls is the series I make for no one but myself — one technique held constant, one theme reinterpreted again and again, and a visible line of progress running underneath all of it.",
  },
];

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return PROJECT_CASE_STUDIES.find((p) => p.slug === slug);
}

export function getProjectCaseStudyByCollection(
  collectionSlug: string
): ProjectCaseStudy | undefined {
  return PROJECT_CASE_STUDIES.find((p) => p.collectionSlug === collectionSlug);
}

export function hasProjectCaseStudy(collectionSlug: string): boolean {
  return PROJECT_CASE_STUDIES.some((p) => p.collectionSlug === collectionSlug);
}

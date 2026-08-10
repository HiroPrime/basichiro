"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Lightbox, { type LightboxItem } from "./Lightbox";
import type { Artwork } from "@/lib/artworks";
import type { Collection } from "@/lib/collections";

type Props = {
  artworks: Artwork[];
  collections?: Collection[];
};

export default function GalleryGrid({ artworks, collections }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of artworks) map[a.collection] = (map[a.collection] ?? 0) + 1;
    return map;
  }, [artworks]);

  const filtered = useMemo(
    () => (filter === "all" ? artworks : artworks.filter((a) => a.collection === filter)),
    [artworks, filter]
  );

  const lightboxItems: LightboxItem[] = filtered.map((a) => ({
    id: a.id,
    image_url: a.image_url,
    title: a.title,
    description: a.description,
  }));

  return (
    <div>
      {collections && collections.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          <FilterButton
            active={filter === "all"}
            label={`All (${artworks.length})`}
            color="#b64bff"
            onClick={() => setFilter("all")}
          />
          {collections
            .filter((c) => counts[c.slug])
            .map((c) => (
              <FilterButton
                key={c.slug}
                active={filter === c.slug}
                label={`${c.title} (${counts[c.slug] ?? 0})`}
                color={c.accent}
                onClick={() => setFilter(c.slug)}
              />
            ))}
        </div>
      )}

      <LayoutGroup>
        <motion.div layout className="masonry">
          <AnimatePresence>
            {filtered.map((art, i) => (
              <motion.button
                key={art.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveIndex(i)}
                className="group relative w-full block overflow-hidden rounded-sm border border-[#1a1a1e] bg-[#0c0c10] text-left cursor-zoom-in"
              >
                <Image
                  src={art.thumb_url}
                  alt={art.title}
                  width={art.width ?? 600}
                  height={art.height ?? 800}
                  unoptimized
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-black uppercase tracking-widest">{art.title}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-24 uppercase tracking-widest">
          No pieces here yet — check back soon.
        </p>
      )}

      <Lightbox
        items={lightboxItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}

function FilterButton({
  active,
  label,
  color,
  onClick,
}: {
  active: boolean;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={active ? { borderColor: color, color } : undefined}
      className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 font-black uppercase tracking-widest text-[10px] md:text-xs transition-colors ${
        active ? "bg-white/5" : "border-[#2a2a30] text-gray-400 hover:border-[#444]"
      }`}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </button>
  );
}

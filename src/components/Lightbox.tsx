"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export type LightboxItem = {
  id: string;
  image_url: string;
  title: string;
  description?: string | null;
};

export default function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const active = activeIndex !== null ? items[activeIndex] : null;

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [active]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!active) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose, goNext, goPrev]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md cursor-zoom-out"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/50 text-white hover:text-[#22d3ee] p-2 md:p-3 rounded-full transition-colors z-[2010]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {items.length > 1 && (
        <>
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:text-[#b64bff] p-2 md:p-3 rounded-full transition-colors z-[2010]"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:text-[#b64bff] p-2 md:p-3 rounded-full transition-colors z-[2010]"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <div
        className="max-w-5xl w-full flex flex-col items-center cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[80vh] flex items-center justify-center">
          <Image
            src={active.image_url}
            alt={active.title}
            width={1600}
            height={1600}
            unoptimized
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-sm border border-[#222] shadow-2xl"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-white font-black uppercase tracking-widest text-sm md:text-base">{active.title}</p>
          {active.description && (
            <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-xl">{active.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

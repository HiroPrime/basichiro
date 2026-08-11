"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox, { type LightboxItem } from "./Lightbox";
import RevealSection from "./RevealSection";
import type { Artwork } from "@/lib/artworks";
import type { ProjectCaseStudy } from "@/lib/projects";

type Props = {
  project: ProjectCaseStudy;
  artworks: Artwork[];
};

export default function ProjectCaseStudyBody({ project, artworks }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = artworks.map((a) => ({
    id: a.id,
    image_url: a.image_url,
    title: a.title,
    description: a.description,
  }));

  const heroArt = artworks[0];
  // Give each written section a real supporting image, pulled in order right
  // after the hero shot, so the writeup reads as image -> text -> image -> text
  // instead of one long block of copy followed by a gallery at the end.
  const sectionImages = project.sections.map((_, i) => artworks[i + 1]);
  const usedCount = 1 + project.sections.length;
  const partingShot = artworks[usedCount];

  return (
    <>
      {heroArt && (
        <RevealSection className="mb-14 md:mb-16">
          <MediaFrame
            art={heroArt}
            onOpen={() => setActiveIndex(0)}
            imgClassName="w-full max-h-[65vh] object-contain md:object-cover"
            showCaptionAlways
            useFullRes
          />
        </RevealSection>
      )}

      <RevealSection as="div" className="mb-16 md:mb-20">
        <div className="border-l-2 pl-6 md:pl-8" style={{ borderColor: project.accent }}>
          <p className="text-gray-200 text-base md:text-xl font-medium leading-relaxed">
            {project.brief}
          </p>
        </div>
      </RevealSection>

      <div className="flex flex-col gap-16 md:gap-20 mb-16 md:mb-20">
        {project.sections.map((section, i) => {
          const art = sectionImages[i];
          const reverse = i % 2 === 1;
          return (
            <RevealSection key={section.heading} delay={0.05 * i}>
              {art ? (
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div className={reverse ? "md:order-2" : "md:order-1"}>
                    <MediaFrame art={art} onOpen={() => setActiveIndex(i + 1)} />
                  </div>
                  <div className={reverse ? "md:order-1" : "md:order-2"}>
                    <SectionHeading heading={section.heading} accent={project.accent} />
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <SectionHeading heading={section.heading} accent={project.accent} />
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {section.body}
                  </p>
                </div>
              )}
            </RevealSection>
          );
        })}
      </div>

      <RevealSection as="div" className="border-t border-[#1a1a1e] pt-10">
        <div
          className={`flex flex-col ${
            partingShot ? "md:flex-row md:items-center md:gap-10" : ""
          }`}
        >
          {partingShot && (
            <div className="w-full md:w-64 shrink-0 mb-6 md:mb-0">
              <MediaFrame art={partingShot} onOpen={() => setActiveIndex(usedCount)} />
            </div>
          )}
          <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed italic">
            {project.closing}
          </p>
        </div>
      </RevealSection>

      <Lightbox
        items={lightboxItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}

function SectionHeading({ heading, accent }: { heading: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
        {heading}
      </h2>
    </div>
  );
}

function MediaFrame({
  art,
  onOpen,
  imgClassName,
  showCaptionAlways,
  useFullRes,
}: {
  art: Artwork;
  onOpen: () => void;
  imgClassName?: string;
  showCaptionAlways?: boolean;
  /** Use the full-resolution image instead of the 640px thumbnail — for large
   * display sizes (like the hero banner) where the thumbnail would blur when
   * stretched to fill the space. */
  useFullRes?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full block overflow-hidden rounded-sm border border-[#ddd8cc] bg-[#f2efe7] text-left cursor-zoom-in"
    >
      <Image
        src={useFullRes ? art.image_url : art.thumb_url}
        alt={art.title}
        width={art.width ?? 700}
        height={art.height ?? 900}
        unoptimized
        className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${
          imgClassName ?? ""
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 transition-opacity flex items-end p-3 md:p-4 ${
          showCaptionAlways ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <p className="text-white text-[10px] md:text-xs font-black uppercase tracking-widest">
          {art.title}
        </p>
      </div>
    </button>
  );
}

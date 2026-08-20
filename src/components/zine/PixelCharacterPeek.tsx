"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The 8-bit pixel sprite of Jacob climbs up from below the footer's email
 * form as that row scrolls into view, ending with just its head peeking
 * out above the input/submit row (per the original design reference).
 *
 * Meant to be rendered as a child of a `relative`-positioned form/row so
 * it's scoped to that footer section rather than the whole page. A short
 * `overflow-hidden` window sits right above the row; the sprite itself is
 * translated within it so only its head fraction ever becomes visible.
 */
export default function PixelCharacterPeek() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute right-3 sm:right-6 bottom-full z-10 h-5 sm:h-7 w-12 sm:w-16 overflow-hidden"
    >
      <motion.div className="absolute inset-x-0 top-0" style={{ y, rotate }}>
        <Image
          src="/design/pixel-character.webp"
          alt=""
          width={400}
          height={700}
          className="w-full h-auto drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)]"
        />
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The 8-bit pixel sprite of Jacob "climbs" the page: fixed to the viewport,
 * its vertical position is driven directly by whole-page scroll progress,
 * moving from near the bottom of the screen toward the top as you scroll.
 *
 * The outer wrapper is fixed to the full viewport but capped to the same
 * centered max-w-[480px] column as the page content, so the sprite clings
 * to the edge of that column instead of stranding at the real viewport edge
 * on wide desktop screens.
 */
export default function ClimbingPixelCharacter() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["86vh", "10vh"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 mx-auto h-0 w-full max-w-[480px]"
    >
      <motion.div
        className="absolute right-2 sm:right-6 w-12 sm:w-16 opacity-90 drop-shadow-[2px_2px_0_rgba(0,0,0,0.25)]"
        style={{ top, rotate }}
      >
        <Image
          src="/design/pixel-character.webp"
          alt=""
          width={400}
          height={700}
          className="w-full h-auto"
        />
      </motion.div>
    </div>
  );
}

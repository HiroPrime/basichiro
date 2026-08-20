"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a small illustration (rocket, ghost detective, corner planet) and
 * drifts it along a direction (matching the reference design's red
 * "Move with scroll" arrows) as its own section scrolls through the
 * viewport, at a different speed than the page scroll itself.
 */
export default function ScrollParallax({
  children,
  className,
  xRange = [0, 0],
  yRange = [0, 0],
  rotateRange,
}: {
  children: ReactNode;
  className?: string;
  /** [start, end] px horizontal drift across the section's scroll-through. */
  xRange?: [number, number];
  /** [start, end] px vertical drift across the section's scroll-through. */
  yRange?: [number, number];
  /** Optional [startDeg, endDeg] rotation applied across the same range. */
  rotateRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], xRange);
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange ?? [0, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ x, y, rotate }}>
      {children}
    </motion.div>
  );
}

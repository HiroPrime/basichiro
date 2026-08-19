"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a small illustration (rocket, ghost detective, corner planet) and
 * drifts it vertically/rotationally as its own section scrolls through the
 * viewport, at a different speed than the page scroll itself.
 */
export default function ScrollParallax({
  children,
  className,
  speed = 40,
  rotateRange,
}: {
  children: ReactNode;
  className?: string;
  /** Total px of vertical drift across the section's scroll-through. */
  speed?: number;
  /** Optional [startDeg, endDeg] rotation applied across the same range. */
  rotateRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange ?? [0, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ y, rotate }}>
      {children}
    </motion.div>
  );
}

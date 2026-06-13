"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils/cn";

interface AnimatedGridProps {
  /** Grid cell size in px. Matches the design's 34px texture by default. */
  size?: number;
  className?: string;
}

/**
 * MagicUI-style animated grid pattern — a subtle, on-brand version of the
 * hero tech-grid. A small set of accent nodes pulse softly at random
 * intersections; the underlying hairline grid and corner-fade mask are
 * inherited from `.hero::before` in globals.css, so this layer only adds the
 * motion. Restrained on purpose — one quiet flourish, not a light show.
 */
export function AnimatedGrid({ size = 34, className }: AnimatedGridProps) {
  const id = useId();
  const reduce = useReducedMotion();
  if (reduce) return null;

  // Deterministic node positions (col, row) near the top-right where the
  // hero mask reveals the grid — no randomness so SSR and client agree.
  const nodes = [
    { c: 7, r: 1 },
    { c: 9, r: 2 },
    { c: 8, r: 3 },
    { c: 10, r: 1 },
    { c: 6, r: 2 },
  ];

  return (
    <div className={cn("animated-grid", className)} aria-hidden>
      {nodes.map((node, i) => (
        <motion.span
          key={`${id}-${i}`}
          className="animated-grid-node"
          style={{ left: node.c * size, top: node.r * size }}
          initial={{ opacity: 0.15, scale: 0.8 }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.15, 0.8] }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

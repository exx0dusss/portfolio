"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger step — 1, 2, 3 map to the design's d1/d2/d3 delays. */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  /** Render as a different element (e.g. "section", "article", "p"). */
  as?: keyof typeof motion;
}

const DELAYS: Record<number, number> = { 0: 0, 1: 0.05, 2: 0.1, 3: 0.15 };

/**
 * Soft scroll reveal — the motion-driven replacement for the prototype's
 * `.reveal`/IntersectionObserver pair. Fades up once when scrolled into view;
 * collapses to a no-op under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px", amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: DELAYS[delay] }}
    >
      {children}
    </MotionTag>
  );
}

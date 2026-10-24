"use client";

import { motion, useReducedMotion } from "motion/react";

import { IN_VIEW, POP } from "./springs";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger step — 1, 2, 3 delay the entrance in small increments. */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  /** Render as a different element (e.g. "section", "article", "p"). */
  as?: keyof typeof motion;
}

const DELAYS: Record<number, number> = { 0: 0, 1: 0.08, 2: 0.16, 3: 0.24 };

/**
 * Scroll reveal: springs up into place once when scrolled into view.
 * Collapses to a no-op under prefers-reduced-motion.
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ ...POP, delay: DELAYS[delay] }}
    >
      {children}
    </MotionTag>
  );
}

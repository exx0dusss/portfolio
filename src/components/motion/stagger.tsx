"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { IN_VIEW, POP, STAGGER } from "./springs";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
}

const LIST: Variants = { hidden: {}, show: { transition: { staggerChildren: STAGGER } } };
const ITEM: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP },
};

/** A list whose StaggerItem children spring in one after another when the
 *  list scrolls into view. */
export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={LIST} initial="hidden" whileInView="show" viewport={IN_VIEW}>
      {children}
    </MotionTag>
  );
}

/** One entry of a Stagger list; inherits the list's animation timing. */
export function StaggerItem({ children, className, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as as React.ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={ITEM}>
      {children}
    </MotionTag>
  );
}

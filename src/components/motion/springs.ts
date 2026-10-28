import type { Transition } from "motion/react";

/** Entrance motion: quick and decisive, easing out without overshoot. */
export const POP: Transition = { type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] };

/** Delay between siblings in a staggered list, in seconds. */
export const STAGGER = 0.06;

/** Shared viewport trigger: fire once, slightly before fully in view. */
export const IN_VIEW = { once: true, margin: "0px 0px -8% 0px", amount: 0.15 } as const;

/** Trigger for a list: a share of a tall list can stay out of view while
 *  its first row is on screen, so fire as soon as any of it nears the
 *  viewport's bottom edge. */
export const LIST_IN_VIEW = { once: true, margin: "0px 0px 15% 0px", amount: "some" } as const;

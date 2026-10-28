import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const faceIconVariants = cva("flex-none text-figure-ink", {
  variants: {
    motion: {
      none: "",
      /** Tilts when a `group` parent is hovered (the nav brand). */
      tilt: "transition-transform duration-350 ease-pop group-hover:-rotate-8",
    },
  },
  defaultVariants: {
    motion: "none",
  },
});

/** The stick figure's head (same drawing as app/icon.svg), themed through
 *  the --figure-* tokens so it matches the hero figure in light and dark.
 *  Decorative. Where it sits decides its size, e.g. the nav brand:
 *
 *    <FaceIcon motion="tilt" className="size-8" /> */
export function FaceIcon({
  motion,
  className,
}: VariantProps<typeof faceIconVariants> & { className?: string }) {
  return (
    <svg
      data-slot="face-icon"
      className={cn(faceIconVariants({ motion }), className)}
      viewBox="264 57 196 196"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="362" cy="155" r="80" fill="var(--figure-shade)" stroke="none" />
      <circle cx="352" cy="138" r="76" fill="var(--figure-face)" stroke="none" />
      <circle cx="362" cy="155" r="84" strokeWidth={18} />
      <circle cx="327" cy="143" r="12" fill="var(--figure-features)" stroke="none" />
      <circle cx="397" cy="143" r="12" fill="var(--figure-features)" stroke="none" />
      <path d="M332 178 Q362 192 392 178" stroke="var(--figure-features)" strokeWidth={11} />
    </svg>
  );
}

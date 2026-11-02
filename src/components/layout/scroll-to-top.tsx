"use client";

import { ArrowUpIcon } from "@/components/ui/icons";

/** Round "back to top" button in the bottom-right corner, below the nav and
 *  popups. It rises in past the first screen with a scroll-driven animation
 *  (globals.css), hidden and out of the tab order until then. Scrolls with
 *  the page's scroll-behavior, so smoothly, or instantly under reduced
 *  motion. */
export function ScrollToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-slot="scroll-to-top"
      className="fixed right-6 bottom-corner z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-card p-0 text-fg-dim shadow-float transition-scroll-top hover:border-fg-faint hover:text-fg max-phone:right-4 max-phone:bottom-corner-phone print:hidden [&_svg]:size-4.5"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUpIcon aria-hidden />
    </button>
  );
}

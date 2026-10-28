"use client";

import { useSyncExternalStore } from "react";

import { ArrowUpIcon } from "@/components/ui/icons";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** Shown once the visitor is more than a screen down the page. */
const isPastFirstScreen = () => window.scrollY > window.innerHeight;

/** Round "back to top" button in the bottom-right corner, below the nav and
 *  popups. Fades and rises in after the first screen; out of the tab order
 *  and hidden from assistive tech while it's away (inert). Scrolls with the
 *  page's scroll-behavior, so smoothly, or instantly under reduced motion. */
export function ScrollToTop({ label }: { label: string }) {
  const visible = useSyncExternalStore(subscribe, isPastFirstScreen, () => false);

  return (
    <button
      type="button"
      className="fixed right-6 bottom-corner z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-card p-0 text-fg-dim opacity-0 shadow-float transition-scroll-top translate-y-3 hover:border-fg-faint hover:text-fg data-[visible=true]:translate-none data-[visible=true]:opacity-100 max-phone:right-4 max-phone:bottom-corner-phone print:hidden [&_svg]:size-4.5"
      data-visible={visible}
      inert={!visible}
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUpIcon aria-hidden />
    </button>
  );
}

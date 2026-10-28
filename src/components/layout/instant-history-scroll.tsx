"use client";

import { useEffect } from "react";

/**
 * Makes back/forward land at the saved scroll position instantly.
 *
 * globals.css sets `scroll-behavior: smooth` for in-page anchors, and the
 * browser applies it to its own scroll restoration too, so going back
 * showed the page at the top and then glided down (which also broke the
 * view transition). Route changes are covered by data-scroll-behavior on
 * <html>; this covers history. On popstate it switches smooth scrolling off; the
 * next click or key press, which is what starts an anchor jump, switches
 * it back on. Renders nothing.
 */
export function InstantHistoryScroll() {
  useEffect(() => {
    const html = document.documentElement;
    const restore = () => {
      html.style.removeProperty("scroll-behavior");
    };
    const onPopState = (event: PopStateEvent) => {
      // a plain #anchor click fires popstate too, before it scrolls, with no
      // state; only entries Next pushed (page to page) carry state
      if (event.state === null) return;
      html.style.scrollBehavior = "auto";
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("pointerdown", restore, { capture: true });
    window.addEventListener("keydown", restore, { capture: true });
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pointerdown", restore, { capture: true });
      window.removeEventListener("keydown", restore, { capture: true });
      restore();
    };
  }, []);

  return null;
}

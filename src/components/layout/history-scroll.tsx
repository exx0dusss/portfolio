"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const STORAGE_KEY = "scroll-positions";

// one instance (in the root layout), so module state is enough
let positions = new Map<string, number>();
let currentPath: string | null = null;
let previousPath: string | null = null;
let restoreTo: number | null = null;

function save() {
  if (currentPath !== null) positions.set(currentPath, window.scrollY);
}

/** The in-site page visited before this one, if any. */
export function getPreviousPath(): string | null {
  return previousPath;
}

/** Put `path` back where the visitor left it on the next navigation; pair
 *  with a `<Link scroll={false}>` so Next doesn't scroll to the top. */
export function restoreScrollOnNavigate(path: string) {
  restoreTo = positions.get(path) ?? 0;
}

/**
 * Restores scroll positions ourselves, per path: on back/forward, on reload,
 * and for links that ask via `restoreScrollOnNavigate` (the case-study
 * backlink).
 *
 * The position goes back in a layout effect, inside React's commit. That
 * matters for view transitions: React pairs <ViewTransition> titles by
 * what's in view at commit time, so a list restored afterwards (by the
 * browser, or after Next's scroll to top) only morphed the rows near the
 * top. Renders nothing.
 */
export function HistoryScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";

    // a plain #anchor click fires popstate too, with no state; only entries
    // Next pushed (page to page) carry state
    const onPopState = (event: PopStateEvent) => {
      if (event.state === null) return;
      save();
      restoreTo = positions.get(window.location.pathname) ?? 0;
    };
    // sessionStorage, so a reload comes back to the same place
    const persist = () => {
      save();
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...positions]));
      } catch {}
    };

    try {
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as [string, number][];
      positions = new Map(stored);
    } catch {}
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (entry?.type === "reload" && currentPath !== null) {
      window.scrollTo({ top: positions.get(currentPath) ?? 0, behavior: "instant" });
    }

    // capture: runs before Next's own click and popstate handlers
    window.addEventListener("click", save, { capture: true });
    window.addEventListener("popstate", onPopState, { capture: true });
    window.addEventListener("pagehide", persist);
    return () => {
      window.removeEventListener("click", save, { capture: true });
      window.removeEventListener("popstate", onPopState, { capture: true });
      window.removeEventListener("pagehide", persist);
      history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    if (currentPath !== pathname) {
      previousPath = currentPath;
      currentPath = pathname;
    }
    if (restoreTo === null) return;
    // "instant" skips the smooth scroll-behavior set for in-page anchors
    window.scrollTo({ top: restoreTo, behavior: "instant" });
    restoreTo = null;
  }, [pathname]);

  return null;
}

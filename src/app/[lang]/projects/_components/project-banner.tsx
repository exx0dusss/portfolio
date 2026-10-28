"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

/** The site's theme as rendered: the visitor's pick in the nav (data-theme on
 *  <html>), otherwise the OS, as the dark: variant resolves it. */
function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}
const isDark = () => {
  const picked = document.documentElement.dataset.theme;
  return picked ? picked === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * A case study's colours behind its hero: one continuous mesh gradient in the
 * project's own palette, flowing slowly (Paper Shaders, WebGL), fading into
 * the page. Sits behind the nav and the hero without taking any space.
 * Decorative; it holds still when the visitor prefers reduced motion.
 *
 * Each theme gets its own palette. Include the page background among the
 * colours, so the art dissolves into the page rather than sitting on it as a
 * band; the dark set uses deeper hues, which glow on black where pale tints
 * would turn grey.
 *
 *   <ProjectBanner colors={{ light: ["#fdd795", …, "#ffffff"], dark: [… "#0c0c0c"] }} />
 *   <PageShell>…</PageShell>
 */
export function ProjectBanner({
  colors,
  pattern,
}: {
  colors: { light: string[]; dark: string[] };
  /** Where the composition sits: offsets from -1 to 1, rotation in degrees. */
  pattern?: { offsetX?: number; offsetY?: number; rotation?: number };
}) {
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);
  const reduce = useReducedMotion();

  return (
    <div
      data-slot="project-banner"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-banner mask-b-from-35% mask-b-to-100% dark:opacity-60"
    >
      <MeshGradient
        className="size-full"
        colors={dark ? colors.dark : colors.light}
        distortion={0.8}
        swirl={0.15}
        speed={reduce ? 0 : 0.25}
        {...pattern}
        // soft colour needs no full resolution; cap it to spare the GPU
        minPixelRatio={1}
        maxPixelCount={1280 * 720}
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { ArrowsOutIcon } from "@/components/ui/icons";

/** The viewer loads on first open, so the page doesn't carry it. */
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

type Size = { width: number; height: number };

/** Light line art turned light-on-dark in dark mode, hues turned back. */
const DRAWING = "dark:invert-93 dark:hue-rotate-180";

/**
 * SketchDiagram's picture and the viewer it opens. Wide screens show the
 * sketch near its drawn size with a button over it; below the nav breakpoint
 * (1040px) it would shrink past legibility, so a preview block takes its
 * place: the whole sketch small, and "See architecture". Either opens the
 * viewer at the drawing's own size, to be dragged around and pinched.
 */
export function SketchViewer({
  slug,
  alt,
  size,
  label,
}: {
  slug: string;
  alt: string;
  size: Size;
  /** the button's name, e.g. "Open the architecture sketch full size" */
  label: string;
}) {
  const src = `/diagrams/${slug}.svg`;
  // mounted on first open and kept, so closing fades out
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);

  function show() {
    setOpened(true);
    setOpen(true);
  }

  return (
    <>
      {/* the picture stays outside the button, so its alt (the sketch in
          words) is still read; the button covers it with its own name */}
      <div className="group/sketch relative max-nav:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG at its drawn size */}
        <img
          src={src}
          alt={alt}
          {...size}
          loading="lazy"
          decoding="async"
          className={`mx-auto block h-auto max-w-full ${DRAWING}`}
        />
        <button
          type="button"
          className="absolute inset-0 cursor-zoom-in rounded-10 bg-transparent p-0"
          aria-label={label}
          onClick={show}
        >
          {/* a hint in the corner, like the gallery's */}
          <span
            aria-hidden
            className="absolute top-0 right-0 grid size-8.5 place-items-center rounded-full border border-line bg-card text-fg-dim opacity-0 transition-opacity duration-150 ease-standard group-focus-within/sketch:opacity-100 group-hover/sketch:opacity-100 [&_svg]:size-4"
          >
            <ArrowsOutIcon />
          </span>
        </button>
      </div>

      <button
        type="button"
        className="flex w-full cursor-zoom-in flex-col bg-transparent p-0 text-left nav:hidden"
        onClick={show}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG preview */}
        <img
          src={src}
          alt={alt}
          {...size}
          loading="lazy"
          decoding="async"
          className={`block h-auto w-full px-4 pt-5 ${DRAWING}`}
        />
        <span className="mt-4 flex items-center justify-between gap-3 border-t border-line px-4 py-3.5">
          <span>
            <span className="block text-15 font-medium text-fg">See architecture</span>
            <span className="mt-0.5 block text-13 text-fg-dim">Opens zoomed in to read</span>
          </span>
          <span
            aria-hidden
            className="grid size-8.5 flex-none place-items-center rounded-full border border-line bg-card text-fg-dim [&_svg]:size-4"
          >
            <ArrowsOutIcon />
          </span>
        </span>
      </button>

      {opened && (
        <Lightbox
          slides={[{ src, alt, ...size }]}
          index={open ? 0 : -1}
          onClose={() => setOpen(false)}
          drawing
        />
      )}
    </>
  );
}

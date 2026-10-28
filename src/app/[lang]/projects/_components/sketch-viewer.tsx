"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { ArrowsOutIcon } from "@/components/ui/icons";
import type { LightboxSlide } from "@/components/ui/lightbox";

/** The viewer loads on first open, so the page doesn't carry it. */
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

type Size = { width: number; height: number };

/**
 * SketchDiagram's picture, with a button over it that opens it full screen
 * (zoom by pinch, scroll or double-tap). Opens the version on screen: the
 * wide sketch on desktop, the tall one below `mobileQuery`.
 */
export function SketchViewer({
  slug,
  alt,
  desktop,
  mobile,
  mobileQuery,
  label,
}: {
  slug: string;
  alt: string;
  desktop: Size;
  mobile: Size;
  mobileQuery: string;
  /** the button's name, e.g. "Open the architecture sketch full size" */
  label: string;
}) {
  const img = useRef<HTMLImageElement>(null);
  // the slide stays set after closing, so the viewer can fade out
  const [slide, setSlide] = useState<LightboxSlide | null>(null);
  const [open, setOpen] = useState(false);

  function show() {
    const narrow = window.matchMedia(mobileQuery).matches;
    const size = narrow ? mobile : desktop;
    setSlide({
      src: img.current?.currentSrc || `/diagrams/${slug}${narrow ? ".mobile" : ""}.svg`,
      alt,
      ...size,
    });
    setOpen(true);
  }

  return (
    <>
      {/* the picture stays outside the button, so its alt (the sketch in
          words) is still read; the button covers it with its own name */}
      <div className="group/sketch relative">
        <picture>
          <source media={mobileQuery} srcSet={`/diagrams/${slug}.mobile.svg`} {...mobile} />
          <img
            ref={img}
            src={`/diagrams/${slug}.svg`}
            alt={alt}
            {...desktop}
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto max-w-full dark:invert-93 dark:hue-rotate-180"
          />
        </picture>
        <button
          type="button"
          className="absolute inset-0 cursor-zoom-in rounded-10 bg-transparent p-0"
          aria-label={label}
          onClick={show}
        >
          {/* a hint in the corner, like the gallery's */}
          <span
            aria-hidden
            className="absolute top-0 right-0 grid size-8.5 place-items-center rounded-full border border-line bg-card text-fg-dim opacity-0 transition-opacity duration-150 ease-standard group-hover/sketch:opacity-100 group-focus-within/sketch:opacity-100 pointer-coarse:opacity-100 [&_svg]:size-4"
          >
            <ArrowsOutIcon />
          </span>
        </button>
      </div>
      {slide && <Lightbox slides={[slide]} index={open ? 0 : -1} onClose={() => setOpen(false)} drawing />}
    </>
  );
}

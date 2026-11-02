"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";

import type { DrawingItem } from "./projects-detail";

/** The viewer loads on first open, so the page doesn't carry it. */
const Lightbox = dynamic(() => import("@/components/ui/lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

/**
 * Drawings from a project's planning (an Excalidraw canvas, exported like the
 * architecture sketch): a grid of tiles, each the whole drawing fitted and
 * titled, inverted in dark mode. A tile opens the drawing viewer on it, and
 * the others follow as slides.
 *
 *   <DrawingGallery items={[{ title: "Server architecture", src, alt, width, height }]} />
 */
export function DrawingGallery({ items }: { items: DrawingItem[] }) {
  // mounted on first open and kept, so closing fades out
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(-1);

  function show(at: number) {
    setOpened(true);
    setIndex(at);
  }

  return (
    <>
      <Reveal className="grid grid-cols-2 gap-3.5 max-phone:grid-cols-1">
        {items.map((item, at) => (
          <button
            key={item.src}
            type="button"
            data-slot="drawing-tile"
            className="flex cursor-zoom-in flex-col overflow-hidden rounded-card border border-line-strong bg-card-2 p-0 text-left"
            onClick={() => show(at)}
          >
            <span className="block aspect-4/3 overflow-hidden p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG drawing */}
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="size-full object-contain dark:hue-rotate-180 dark:invert-93"
              />
            </span>
            <span className="border-t border-line px-4 py-3 text-14 font-medium text-fg">
              {item.title}
            </span>
          </button>
        ))}
      </Reveal>
      {opened && (
        <Lightbox
          slides={items.map(({ src, alt, title, width, height }) => ({
            src,
            alt,
            title,
            width,
            height,
          }))}
          index={index}
          onClose={() => setIndex(-1)}
          drawing
        />
      )}
    </>
  );
}

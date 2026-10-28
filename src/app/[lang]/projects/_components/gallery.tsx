"use client";

import { useSyncExternalStore } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ArrowsOutIcon, ImagesIcon } from "@/components/ui/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Lightbox } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils/cn";

import type { GalleryItem } from "./projects-detail";

/* One lightbox per page, opened from the gallery tiles, the cover
   (GalleryCover) or the hero (OpenGalleryButton). They render in different
   parts of the page, so the open index lives in this tiny shared store. */
let openIndex = -1;
const listeners = new Set<() => void>();
function setOpenIndex(next: number) {
  openIndex = next;
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function useOpenIndex() {
  return useSyncExternalStore(
    subscribe,
    () => openIndex,
    () => -1,
  );
}

/** A screenshot tile that opens the lightbox at `index`. */
function OpenTile({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      // the site-wide :focus-visible ring (unlayered CSS) sits 3px outside,
      // where the tile's frame clips it; this one is drawn inside, hence `!`
      className="group relative block w-full cursor-zoom-in border-none bg-transparent p-0 focus-visible:-outline-offset-2! **:data-[slot=image-slot-image]:transition-transform **:data-[slot=image-slot-image]:duration-400 **:data-[slot=image-slot-image]:ease-pop hover:**:data-[slot=image-slot-image]:scale-101.5"
      aria-label={`Open “${label}” fullscreen`}
      onClick={() => setOpenIndex(index)}
    >
      {children}
      {/* always shown on touch screens, which have no hover to reveal it */}
      <span
        className="absolute top-2.5 right-2.5 grid size-7.5 place-items-center rounded-8 bg-scrim text-on-scrim opacity-0 transition-opacity duration-200 ease-pop group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        aria-hidden
      >
        <ArrowsOutIcon />
      </span>
    </button>
  );
}

/**
 * Screenshot gallery — a wide 16:9 lead tile plus 4:3 tiles. Tiles with a
 * screenshot open the fullscreen Lightbox (ui/lightbox) at that image. Pass
 * the page's `cover` to make it the first slide, so the cover and the hero's
 * Screenshots button open the same set.
 */
export function Gallery({ items, cover }: { items: GalleryItem[]; cover?: GalleryItem }) {
  const index = useOpenIndex();
  const shots = [...(cover?.src ? [cover] : []), ...items.filter((item) => item.src)];
  const slides = shots.map((item) => ({ src: item.src!, alt: item.alt, title: item.placeholder }));

  return (
    <>
      <Reveal className="grid grid-cols-2 gap-3.5 max-phone:grid-cols-1">
        {items.map((item) => {
          const tile = (
            <ImageSlot
              shape="rect"
              src={item.src}
              alt={item.alt}
              loading="lazy"
              placeholder={item.placeholder}
              className={cn("h-auto w-full", item.wide ? "aspect-video" : "aspect-4/3")}
            />
          );
          return (
            <div
              className={cn(
                "overflow-hidden rounded-card border border-line-strong bg-card-2",
                item.wide && "col-span-full",
              )}
              key={item.placeholder}
            >
              {item.src ? (
                <OpenTile index={shots.indexOf(item)} label={item.placeholder}>
                  {tile}
                </OpenTile>
              ) : (
                tile
              )}
            </div>
          );
        })}
      </Reveal>
      <Lightbox slides={slides} index={index} onClose={() => setOpenIndex(-1)} />
    </>
  );
}

/** The page cover; opens the gallery lightbox at its first slide. */
export function GalleryCover({ cover }: { cover: GalleryItem }) {
  const image = (
    <ImageSlot
      shape="rect"
      src={cover.src}
      alt={cover.alt}
      placeholder={cover.placeholder}
      className="aspect-video h-auto w-full"
    />
  );
  return cover.src ? (
    <OpenTile index={0} label={cover.placeholder}>
      {image}
    </OpenTile>
  ) : (
    image
  );
}

/** "Screenshots (5)": opens the gallery lightbox from anywhere on the page. */
export function OpenGalleryButton({ count }: { count: number }) {
  return (
    <Button variant="ghost" onClick={() => setOpenIndex(0)}>
      <ImagesIcon aria-hidden /> Screenshots ({count})
    </Button>
  );
}

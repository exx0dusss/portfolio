"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ArrowsOutIcon } from "@/components/ui/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Lightbox } from "@/components/ui/lightbox";

import type { GalleryItem } from "./projects-detail";

/**
 * Screenshot gallery — a wide 16:9 lead tile plus 4:3 tiles. Tiles with a
 * screenshot open the fullscreen Lightbox (ui/lightbox) at that image.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(-1);
  const shots = items.filter((item) => item.src);
  const slides = shots.map((item) => ({ src: item.src!, alt: item.alt, title: item.placeholder }));

  return (
    <>
      <Reveal className="gal">
        {items.map((item) => {
          const tile = (
            <ImageSlot
              shape="rect"
              src={item.src}
              alt={item.alt}
              loading="lazy"
              placeholder={item.placeholder}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                aspectRatio: item.wide ? "16/9" : "4/3",
              }}
            />
          );
          return (
            <div className={`g${item.wide ? " wide" : ""}`} key={item.placeholder}>
              {item.src ? (
                <button
                  type="button"
                  className="g-open"
                  aria-label={`Open “${item.placeholder}” fullscreen`}
                  onClick={() => setIndex(shots.indexOf(item))}
                >
                  {tile}
                  <span className="g-hint" aria-hidden>
                    <ArrowsOutIcon />
                  </span>
                </button>
              ) : (
                tile
              )}
            </div>
          );
        })}
      </Reveal>
      <Lightbox slides={slides} index={index} onClose={() => setIndex(-1)} />
    </>
  );
}

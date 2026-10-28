"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";

import { Reveal } from "@/components/motion/reveal";
import { ArrowsOutIcon } from "@/components/ui/icons";
import { ImageSlot } from "@/components/ui/image-slot";

import type { GalleryItem } from "./projects-detail";

/**
 * Screenshot gallery — a wide 16:9 lead tile plus 4:3 tiles. Tiles with a
 * screenshot open a fullscreen lightbox: swipe or arrow keys to move, pinch,
 * scroll or double-tap to zoom, Esc or swipe down to close.
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
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Counter, Zoom]}
        carousel={{ finite: slides.length < 3, padding: "4%" }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        captions={{ descriptionTextAlign: "center" }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        animation={{ swipe: 280, fade: 200 }}
        className="lightbox"
      />
    </>
  );
}

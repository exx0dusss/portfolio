"use client";

import { useState } from "react";
import YetAnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  XIcon,
} from "@/components/ui/icons";

interface LightboxSlide {
  src: string;
  alt?: string;
  /** Shown top-left with the position, e.g. "Services  2 of 4". */
  title?: string;
}

/**
 * Fullscreen image viewer on yet-another-react-lightbox, dressed in the
 * site's design: a dark blurred backdrop in both themes (screenshots read
 * best on dark), framed slides, round outline buttons, and a thumbnail strip
 * whose active thumb carries the only accent. Swipe, arrow keys, pinch,
 * scroll or double-tap to zoom; Esc, swipe down or the backdrop to close.
 *
 *   const [index, setIndex] = useState(-1);
 *   <Lightbox slides={slides} index={index} onClose={() => setIndex(-1)} />
 *
 * Opens when `index` is 0 or more.
 */
function Lightbox({
  slides,
  index,
  onClose,
}: {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
}) {
  // the slide in view, for the header; follows swipes and thumbnail clicks
  const [current, setCurrent] = useState(index);
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    setCurrent(index);
  }
  const slide = slides[current];

  return (
    <YetAnotherLightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Thumbnails, Zoom]}
      className="lightbox"
      on={{ view: ({ index: viewed }) => setCurrent(viewed) }}
      // finite: a short set reads better with a start and an end than looping,
      // and the thumbnail strip then shows each image exactly once
      carousel={{ finite: true, padding: "64px", spacing: "8%" }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      animation={{ swipe: 320, fade: 220 }}
      zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
      thumbnails={{
        position: "bottom",
        width: 72,
        height: 45,
        border: 1,
        borderRadius: 8,
        padding: 0,
        gap: 10,
        imageFit: "cover",
        vignette: false,
      }}
      render={{
        iconPrev: () => <CaretLeftIcon />,
        iconNext: () => <CaretRightIcon />,
        iconClose: () => <XIcon />,
        iconZoomIn: () => <MagnifyingGlassPlusIcon />,
        iconZoomOut: () => <MagnifyingGlassMinusIcon />,
        controls: () =>
          slide && (
            <div className="lightbox-header" aria-live="polite">
              {slide.title && <span className="lightbox-title">{slide.title}</span>}
              {slides.length > 1 && (
                <span className="lightbox-count">
                  {current + 1} of {slides.length}
                </span>
              )}
            </div>
          ),
      }}
    />
  );
}

export { Lightbox, type LightboxSlide };

"use client";

import { useState } from "react";
import YetAnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// the site's theme for the library, after its own styles
import "./lightbox.css";

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
 * Opens when `index` is 0 or more. A single slide drops the thumbnail strip
 * and the arrows. `drawing` is for line art on a transparent background (the
 * architecture sketches): shown inverted, light on the dark room, as the
 * page shows it in dark mode.
 */
function Lightbox({
  slides,
  index,
  onClose,
  drawing = false,
}: {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  drawing?: boolean;
}) {
  // the slide in view, for the header; follows swipes and thumbnail clicks
  const [current, setCurrent] = useState(index);
  const [prevIndex, setPrevIndex] = useState(index);
  if (index !== prevIndex) {
    setPrevIndex(index);
    setCurrent(index);
  }
  const slide = slides[current];
  const single = slides.length === 1;

  return (
    <YetAnotherLightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={slides}
      plugins={single ? [Zoom] : [Thumbnails, Zoom]}
      // the hooks lightbox.css themes the library through
      // eslint-disable-next-line shadcn/no-unknown-classes
      className={drawing ? "lightbox lightbox-drawing" : "lightbox"}
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
        ...(single && { buttonPrev: () => null, buttonNext: () => null }),
        controls: () =>
          slide && (
            <div
              className="pointer-events-none absolute top-0 left-0 flex items-baseline gap-2.5 px-5 py-5.5 max-phone:px-4"
              aria-live="polite"
            >
              {slide.title && <span className="text-14 font-medium text-fg">{slide.title}</span>}
              {slides.length > 1 && (
                <span className="text-13 text-fg-dim tabular-nums">
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

import { Reveal } from "@/components/motion/reveal";
import diagrams from "@/lib/diagrams.json";

import { SketchViewer } from "./sketch-viewer";

/**
 * A project's hand-drawn architecture sketch (docs/diagrams.md): the SVG
 * `pnpm diagrams` exports from scripts/diagrams/<slug>.mjs, shown at no more
 * than its drawn size. Dark mode inverts the light drawing (as Excalidraw's
 * own dark export does), turning hues back with a half-turn. Spans the whole
 * section, below its label (data-span="full"), so the sketch shows near 1:1;
 * below the nav breakpoint it becomes a preview block. Either opens the
 * viewer at the drawing's size (SketchViewer).
 *
 *   <SketchDiagram slug="kosmetik-profi" alt="…" note="// one server, …" />
 */
export function SketchDiagram({
  slug,
  alt,
  note,
}: {
  slug: keyof typeof diagrams;
  /** what the sketch shows, in words */
  alt: string;
  /** a one-line takeaway under the sketch, as a code comment; leave it out
   *  when the copy around the sketch already says it */
  note?: string;
}) {
  return (
    <div data-span="full">
      <Reveal className="overflow-hidden rounded-14 border border-line-strong bg-card-2 p-8 max-nav:p-0">
        <figure className="m-0">
          <SketchViewer
            slug={slug}
            alt={alt}
            size={diagrams[slug]}
            label="Open the architecture sketch full size"
          />
          {note && (
            <figcaption className="mt-6.5 font-mono text-12.5 text-fg-faint max-nav:mt-0 max-nav:px-4 max-nav:pb-4">
              {note}
            </figcaption>
          )}
        </figure>
      </Reveal>
    </div>
  );
}

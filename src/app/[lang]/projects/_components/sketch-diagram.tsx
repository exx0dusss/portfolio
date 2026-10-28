import { Reveal } from "@/components/motion/reveal";
import diagrams from "@/lib/diagrams.json";

import { SketchViewer } from "./sketch-viewer";

/** The breakpoint where the mobile sketch takes over (the nav's, 1040px):
 *  below it the wide one would shrink past legibility. */
const MOBILE = "(max-width: 1040px)";

/**
 * A project's hand-drawn architecture sketch (docs/diagrams.md): the SVGs
 * `pnpm diagrams` exports from scripts/diagrams/<slug>.mjs, a wide one and a
 * tall one for narrow screens, shown at no more than their drawn size. Dark
 * mode inverts the light drawing (as Excalidraw's own dark export does),
 * turning hues back with a half-turn. Spans the whole section, below its
 * label (data-span="full"), so the wide sketch shows near 1:1; clicking it
 * opens it full screen (SketchViewer).
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
  note: string;
}) {
  const { desktop, mobile } = diagrams[slug];
  return (
    <div data-span="full">
      <Reveal className="rounded-14 border border-line-strong bg-card-2 p-8 max-phone:p-3">
        <figure className="m-0">
          <SketchViewer
            slug={slug}
            alt={alt}
            desktop={desktop}
            mobile={mobile}
            mobileQuery={MOBILE}
            label="Open the architecture sketch full size"
          />
          <figcaption className="mt-6.5 font-mono text-12.5 text-fg-faint">{note}</figcaption>
        </figure>
      </Reveal>
    </div>
  );
}

import { Prose } from "@/components/page";
import { Reveal } from "@/components/motion/reveal";

import type { Swatch } from "./projects-detail";

/**
 * Why a case study looks the way it does: a callout naming where its colours
 * come from, the palette as named swatches, then the story in prose.
 *
 *   <DesignNote callout="This page wears Kosmetik Profi’s colours." swatches={[{ name, hex }]}>
 *     <p>…</p>
 *   </DesignNote>
 */
export function DesignNote({
  callout,
  swatches,
  children,
}: {
  callout: string;
  swatches: Swatch[];
  children: React.ReactNode;
}) {
  return (
    <div data-slot="design-note" className="flex flex-col gap-5.5">
      <Reveal className="rounded-card border border-line-strong bg-card-2 px-5 py-4.5">
        <p className="m-0 text-15 font-medium text-fg">{callout}</p>
        <ul className="m-0 mt-3.5 flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0">
          {swatches.map((swatch) => (
            <li key={swatch.hex} className="flex items-center gap-2 text-13 text-fg-dim">
              <span
                aria-hidden
                className="size-4 flex-none rounded-full border border-line-strong"
                style={{ backgroundColor: swatch.hex }}
              />
              {swatch.name}
              <span className="font-mono text-12 text-fg-faint">{swatch.hex}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Prose>{children}</Prose>
    </div>
  );
}

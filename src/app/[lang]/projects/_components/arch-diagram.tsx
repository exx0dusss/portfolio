import "./arch-diagram.css";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

import type { ArchData } from "./projects-detail";

/** One grid column per diagram column, side by side. */
const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

/**
 * Author → SDK → Surfaces → Data style column flow used on the detail pages.
 * Each column holds titled nodes; one node per diagram may be `accent`.
 * An arrow on each divider shows the direction of flow.
 *
 * Layout follows the diagram's own width (a container query), not the
 * window's: side-by-side columns while each gets ~150px, horizontal lanes
 * (label on top, nodes in a row) below that. `data-cols` picks the
 * breakpoint, since container queries can't read the column count. The
 * lanes and the arrows live in arch-diagram.css.
 */
export function ArchDiagram({ columns, note }: ArchData) {
  return (
    <Reveal className="@container/arch relative overflow-hidden rounded-14 border border-line-strong bg-card-2 p-8 max-phone:p-5.5">
      <div
        data-slot="arch-flow"
        data-cols={columns.length}
        className={cn("relative grid", COLUMNS[columns.length] ?? "grid-cols-4")}
      >
        {columns.map((column, index) => (
          <div
            data-slot="arch-column"
            className="relative flex min-w-0 flex-col gap-3 px-5 first:pl-0 last:pr-0 not-first:border-l not-first:border-dashed not-first:border-line-strong"
            key={column.title}
          >
            {/* arrow on the divider from the previous column; turns to point
                down when the columns stack into lanes */}
            {index > 0 && <span data-slot="arch-link" aria-hidden />}
            <div
              data-slot="arch-column-title"
              className="mb-0.5 text-10.5 font-semibold tracking-caps text-fg-faint uppercase"
            >
              {column.title}
            </div>
            {column.nodes.map((node) => (
              <div
                className={cn(
                  "rounded-10 border border-line-strong bg-bg px-3.75 py-3.25 text-13 font-medium text-fg shadow-node",
                  node.accent && "border-accent bg-accent-soft text-accent-ink",
                )}
                key={node.title}
              >
                {node.title}
                <span className="mt-0.5 block text-11.5 font-normal text-fg-faint">{node.sub}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6.5 font-mono text-12.5 text-fg-faint">{note}</div>
    </Reveal>
  );
}

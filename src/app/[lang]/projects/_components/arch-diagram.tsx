import { Reveal } from "@/components/motion/reveal";

import type { ArchData } from "./projects-detail";

/**
 * Author → SDK → Surfaces → Data style column flow used on the detail pages.
 * Each column holds titled nodes; one node per diagram may be `accent`.
 *
 * Layout follows the diagram's own width (a container query), not the
 * window's: side-by-side columns while each gets ~150px, horizontal lanes
 * (label on top, nodes in a row) below that. `data-cols` picks the
 * breakpoint, since container queries can't read the column count.
 */
export function ArchDiagram({ columns, note }: ArchData) {
  return (
    <Reveal className="arch">
      <div
        className="arch-flow"
        data-cols={columns.length}
        style={{ "--arch-cols": columns.length } as React.CSSProperties}
      >
        {columns.map((column) => (
          <div className="arch-col" key={column.title}>
            <div className="arch-ct">{column.title}</div>
            {column.nodes.map((node) => (
              <div className={`node${node.accent ? " accent" : ""}`} key={node.title}>
                {node.title}
                <span className="ns">{node.sub}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="arch-note">{note}</div>
    </Reveal>
  );
}

import { Reveal } from "@/components/motion/reveal";

import type { ArchData } from "./projects-detail";

/**
 * Author → SDK → Surfaces → Data style column flow used on the detail pages.
 * Each column holds titled nodes; one node per diagram may be `accent`.
 */
export function ArchDiagram({ columns, note }: ArchData) {
  return (
    <Reveal className="arch">
      <div className="arch-flow">
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

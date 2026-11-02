import { Reveal } from "@/components/motion/reveal";
import { StackList } from "@/components/stack-list";

import type { ArchitectureCard } from "./projects-detail";

/** One card per architecture, a row each: its name and where it came from,
 *  what it is and its stack on the left, the principles it holds to on the
 *  right. On a phone the principles follow underneath. */
export function ArchitectureCards({ architectures }: { architectures: ArchitectureCard[] }) {
  return (
    <Reveal className="grid gap-3.5">
      {architectures.map((architecture) => (
        <div
          className="grid grid-cols-2 items-start gap-6 rounded-card border border-line px-5 py-4.5 max-phone:grid-cols-1 max-phone:gap-4"
          key={architecture.name}
        >
          <div>
            <div className="font-mono text-12 text-accent-ink">{architecture.origin}</div>
            <div className="mt-2.5 text-17 font-semibold text-fg">{architecture.name}</div>
            <div className="mt-2 text-13 leading-copy text-fg-dim">{architecture.description}</div>
            <StackList stack={architecture.stack} className="mt-4" />
          </div>
          <ul className="m-0 grid list-none gap-2 rounded-7 bg-card-2 px-4 py-3.5 text-13 leading-copy text-fg-dim">
            {architecture.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>
      ))}
    </Reveal>
  );
}

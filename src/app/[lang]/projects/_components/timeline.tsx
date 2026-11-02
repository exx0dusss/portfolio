import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

import type { TimelineEntry } from "./projects-detail";

/**
 * A project's versions down a vertical rule, oldest first: each a dot, its
 * dates, a title, the stack it ran on, why it came about, and what changed.
 * An abandoned attempt has a dashed dot and says why it was dropped; the
 * current version's dot is filled with the accent.
 *
 *    <Timeline entries={[{ date: "2023", title: "v1", stack: "Node.js", body: … }]} />
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <Reveal>
      <ol data-slot="timeline" className="m-0 list-none p-0">
        {entries.map((entry, index) => (
          <li
            key={entry.title}
            data-slot="timeline-entry"
            className={cn(
              "relative pl-7",
              // the rule runs from this dot to the next one
              index < entries.length - 1 &&
                "pb-7 before:absolute before:top-3 before:bottom-0 before:left-1 before:w-px before:bg-line",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 left-0 size-2.25 rounded-full border border-line-strong bg-bg",
                entry.dropped && "border-dashed border-fg-faint",
                entry.current && "border-accent bg-accent",
              )}
            />
            <div className="font-mono text-12 text-fg-faint">{entry.date}</div>
            <div className="mt-1 flex items-baseline gap-2 text-15 font-medium text-fg">
              {entry.title}
              {entry.dropped && (
                <span className="rounded-6 border border-line px-1.5 font-mono text-11 font-normal text-fg-faint">
                  dropped
                </span>
              )}
            </div>
            {entry.stack && (
              <div className="mt-0.5 font-mono text-12 text-accent-ink">{entry.stack}</div>
            )}
            {entry.why && <Reason label="Why">{entry.why}</Reason>}
            <div className="mt-2 max-w-tagline text-14 leading-copy text-fg-dim">{entry.body}</div>
            {entry.dropped && <Reason label="Dropped">{entry.dropped}</Reason>}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

/** The reason for a transition, under its label. */
function Reason({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="mt-2 max-w-tagline text-14 leading-copy text-fg">
      <span className="mr-2 font-mono text-12 text-accent-ink">{label}</span>
      {children}
    </p>
  );
}

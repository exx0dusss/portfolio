import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

import type { SpeedRow } from "./projects-detail";

const seconds = (ms: number) => `${(ms / 1000).toFixed(ms < 10_000 ? 2 : 1)} s`;

/** Versions side by side by a measured time: each a label, a bar as long as
 *  its time against the slowest, and the time; a version that couldn't run
 *  says why instead. Shorter is faster; the current one takes the accent.
 *  The caption says what is compared. */
export function SpeedBars({ caption, rows }: { caption: string; rows: SpeedRow[] }) {
  const slowest = Math.max(...rows.flatMap((row) => (row.ms ? [row.ms] : [])));
  return (
    <Reveal
      as="figure"
      className="m-0 flex flex-col gap-4.5 rounded-card border border-line px-5 py-5"
    >
      <figcaption className="font-mono text-12.5 text-fg-faint">{caption}</figcaption>
      {rows.map((row) => (
        <div key={row.label} data-slot="speed-row" className="grid gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-14 font-medium text-fg">
              {row.label} <span className="font-normal text-fg-faint">{row.sub}</span>
            </span>
            <span className="flex-none font-mono text-13 text-fg tabular-nums">
              {row.ms ? seconds(row.ms) : "—"}
            </span>
          </div>
          {row.ms ? (
            <div className="h-2 overflow-hidden rounded-full bg-card-2">
              <div
                className={cn("h-full rounded-full", row.current ? "bg-accent" : "bg-fg-faint")}
                style={{ width: `${Math.max(1.5, (row.ms / slowest) * 100)}%` }}
              />
            </div>
          ) : (
            <div className="font-mono text-12 text-fg-faint">{row.failed}</div>
          )}
        </div>
      ))}
    </Reveal>
  );
}

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

/**
 * Periods or versions side by side by the same measures: a table on wide
 * screens, and on a phone one card per row with each measure labelled, so
 * nothing scrolls. The first column names the row; `highlight` marks the row
 * the page is about.
 *
 *   <ComparisonTable columns={["Period", "Commits"]} rows={[["By hand", "308"]]} highlight={1} />
 */
export function ComparisonTable({
  columns,
  rows,
  highlight,
}: {
  columns: string[];
  rows: string[][];
  /** Index of the row to set in the accent. */
  highlight?: number;
}) {
  const measures = columns.slice(1);
  return (
    <Reveal className="rounded-card border border-line">
      <table
        data-slot="comparison-table"
        className="w-full border-collapse text-left text-13 max-phone:hidden"
      >
        <thead className="text-12 text-fg-faint">
          <tr className="border-b border-line">
            {columns.map((column, at) => (
              <th key={column} className={cn("px-4 py-2.5 font-normal", at > 0 && "text-right")}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, at) => (
            <tr key={row[0]} className="border-b border-line last:border-b-0">
              {row.map((cell, col) => (
                <td
                  key={col}
                  className={cn(
                    "px-4 py-2.5",
                    col === 0
                      ? "text-fg"
                      : "text-right font-mono text-12.5 text-fg-dim tabular-nums",
                    at === highlight && col > 0 && "text-accent-ink",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="m-0 hidden list-none p-0 max-phone:block">
        {rows.map((row, at) => (
          <li key={row[0]} className="border-b border-line px-4 py-3.5 last:border-b-0">
            <div className="text-14 font-medium text-fg">{row[0]}</div>
            <dl className="m-0 mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {measures.map((measure, col) => (
                <div key={measure} className="flex items-baseline justify-between gap-2">
                  <dt className="text-12 text-fg-faint">{measure}</dt>
                  <dd
                    className={cn(
                      "m-0 font-mono text-12.5 text-fg-dim tabular-nums",
                      at === highlight && "text-accent-ink",
                    )}
                  >
                    {row[col + 1]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

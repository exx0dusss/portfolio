import { Stagger, StaggerItem } from "@/components/motion/stagger";

import type { TimelineEntry } from "../[lang]/experience/_components/timeline";

/** The home page's compact timeline: role · company on the left, years on
 *  the right, divided by hairlines. Shared by Experience and Education;
 *  below 860px the years drop under the role.
 *
 *    <RoleList rows={localizeTimeline(ROLES, dict.roles, dict.now)} />
 */
export function RoleList({ rows }: { rows: TimelineEntry[] }) {
  return (
    <Stagger>
      {rows.map((row) => (
        <StaggerItem
          key={`${row.role}-${row.company}-${row.year}`}
          className="flex items-baseline justify-between gap-6 border-t border-line py-3.5 text-15 first:border-t-0 first:pt-0 max-tablet:flex-col max-tablet:gap-0.5"
        >
          <div>
            <b className="font-semibold">{row.role}</b>{" "}
            <span className="text-fg-dim">· {row.company}</span>
          </div>
          <span className="font-mono text-12.5 whitespace-nowrap text-fg-faint">{row.year}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

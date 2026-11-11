import { LocaleLink } from "@/components/locale-link";
import { cn } from "@/lib/utils/cn";

export interface ProjectTab {
  label: string;
  href: string;
}

/** A project's pages as tabs: real links, so each one has its own address.
 *
 *    <ProjectTabs tabs={BOT_TABS} current="/projects/exd-download-app/releases" />
 */
export function ProjectTabs({ tabs, current }: { tabs: ProjectTab[]; current: string }) {
  return (
    <nav aria-label="Project pages" data-slot="project-tabs" className="pb-8 max-tablet:pb-6">
      <div className="inline-flex gap-1 rounded-full border border-line-strong bg-card-2 p-1">
        {tabs.map((tab) => (
          <LocaleLink
            key={tab.href}
            href={tab.href}
            aria-current={tab.href === current ? "page" : undefined}
            className={cn(
              "rounded-full px-4.5 py-2 text-14 font-medium text-fg-dim transition duration-150 hover:bg-card hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              "aria-[current=page]:bg-fg aria-[current=page]:text-bg aria-[current=page]:hover:bg-fg aria-[current=page]:hover:text-bg",
            )}
          >
            {tab.label}
          </LocaleLink>
        ))}
      </div>
    </nav>
  );
}

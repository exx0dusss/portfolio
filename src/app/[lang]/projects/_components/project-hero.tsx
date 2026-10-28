import type { Icon } from "@phosphor-icons/react";
import { ViewTransition } from "react";

import { PageHeader } from "@/components/page";
import { StackList } from "@/components/stack-list";
import { ButtonLink } from "@/components/ui/button";
import {
  Fact,
  FactDescription,
  FactHeader,
  FactIcon,
  FactLabel,
  Facts,
  FactValue,
} from "@/components/ui/fact";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  CalendarBlankIcon,
  DiamondsFourIcon,
  GaugeIcon,
  GlobeIcon,
  StackIcon,
  TimerIcon,
  UserIcon,
} from "@/components/ui/icons";
import { Meter, MeterLabel, MeterSegments } from "@/components/ui/meter";
import { cn } from "@/lib/utils/cn";
import { projectTitleTransition } from "@/lib/view-transition";

import { Backlink } from "./backlink";
import type { Openness, OpennessTone, ProjectHeroData } from "./projects-detail";

/** Icon for each fact tile, by its label; unknown labels get a neutral mark. */
const FACT_ICONS: Record<string, Icon> = {
  Year: CalendarBlankIcon,
  Built: TimerIcon,
  Role: UserIcon,
  Type: BriefcaseIcon,
  Difficulty: GaugeIcon,
  Access: GlobeIcon,
  Stack: StackIcon,
};

/** A fact tile with the standard header: icon thumbnail + label. */
function HeroFact({
  label,
  span,
  children,
}: {
  label: string;
  span?: "auto" | "full";
  children: React.ReactNode;
}) {
  const LabelIcon = FACT_ICONS[label] ?? DiamondsFourIcon;
  return (
    <Fact span={span}>
      <FactHeader>
        <FactIcon>
          <LabelIcon />
        </FactIcon>
        <FactLabel>{label}</FactLabel>
      </FactHeader>
      {children}
    </Fact>
  );
}

/** The access dot's color per tone, same language as the work-list status. */
const TONE_DOT: Record<OpennessTone, string> = {
  open: "bg-status-green",
  source: "bg-accent",
  client: "bg-status-amber",
  nda: "bg-fg-faint",
};

/** Access label with a tone dot. Long labels wrap; on phones the dot then
 *  sits on the first line. */
function OpennessBadge({ openness }: { openness: Openness }) {
  return (
    <span className="inline-flex items-center gap-1.75 max-phone:items-start">
      <span
        className={cn(
          "size-1.75 rounded-full max-phone:mt-dot-first-line",
          TONE_DOT[openness.tone],
        )}
      />
      {openness.label}
    </span>
  );
}

/**
 * Project-detail hero: backlink, name, tagline, then the project facts as a
 * grid of matching tiles (meta, difficulty, access, and the stack as logo
 * chips that link out), and optional action buttons. Shared by all project
 * pages — only the data differs.
 */
export function ProjectHero({
  name,
  tagline,
  meta,
  openness,
  difficulty,
  stack,
  actions,
  extraActions,
}: ProjectHeroData) {
  // Rows stay even: up to four tiles share one row, more split into two.
  const tiles = meta.length + (difficulty ? 1 : 0) + 1;
  const columns = tiles <= 4 ? tiles : Math.ceil(tiles / 2);
  return (
    <PageHeader>
      <Backlink />
      <ViewTransition name={projectTitleTransition(name)} share="morph">
        <h1 className="m-0 text-title leading-none font-semibold tracking-display">{name}</h1>
      </ViewTransition>
      <p className="mt-4 max-w-tagline text-17 leading-copy text-fg-dim">{tagline}</p>
      <Facts columns={columns} className="mt-6">
        {meta.map((item) => (
          <HeroFact key={item.key} label={item.key}>
            <FactValue>{item.value}</FactValue>
            {item.sub && <FactDescription>{item.sub}</FactDescription>}
          </HeroFact>
        ))}
        {difficulty && (
          <HeroFact label="Difficulty">
            <FactValue>
              <Meter
                value={difficulty.level}
                max={5}
                aria-label="Difficulty"
                aria-valuetext={`${difficulty.label}, ${difficulty.level} of 5`}
              >
                <MeterSegments />
                <MeterLabel>{difficulty.label}</MeterLabel>
              </Meter>
            </FactValue>
          </HeroFact>
        )}
        <HeroFact label="Access">
          <FactValue>
            <OpennessBadge openness={openness} />
          </FactValue>
        </HeroFact>
        {stack && stack.length > 0 && (
          <HeroFact label="Stack" span="full">
            <StackList stack={stack} />
          </HeroFact>
        )}
      </Facts>
      {((actions && actions.length > 0) || extraActions) && (
        <div className="mt-6 flex flex-wrap gap-2.5">
          {actions?.map((action) =>
            action.href.startsWith("#") ? (
              <ButtonLink key={action.label} variant={action.variant} href={action.href}>
                {action.label}
              </ButtonLink>
            ) : (
              <ButtonLink
                key={action.label}
                variant={action.variant}
                href={action.href}
                target="_blank"
                rel="noopener"
              >
                {action.label} {action.external && <ArrowUpRightIcon aria-hidden />}
              </ButtonLink>
            ),
          )}
          {extraActions}
        </div>
      )}
    </PageHeader>
  );
}

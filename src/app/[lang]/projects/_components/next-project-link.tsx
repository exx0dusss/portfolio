import Link from "next/link";

import { Section } from "@/components/page";
import { ArrowRightIcon } from "@/components/ui/icons";

import type { NextProjectLinkData } from "./projects-detail";

/** "Next project" link that chains the detail pages together: a whole
 *  Section rendered as a link. The row sits in its own flex box because the
 *  section lays out its children on a grid. */
export function NextProjectLink({ name, href }: NextProjectLinkData) {
  return (
    <Section render={<Link href={href} />} className="group">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-13.5 text-fg-faint">Next project</div>
          <div className="mt-1.25 text-28 font-semibold tracking-heading text-fg transition-colors duration-150 ease-standard group-hover:text-accent-ink">
            {name}
          </div>
        </div>
        <ArrowRightIcon
          className="size-6.5 text-fg-faint transition-next-arrow group-hover:translate-x-1 group-hover:text-accent-ink"
          aria-hidden
        />
      </div>
    </Section>
  );
}

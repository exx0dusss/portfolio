import Link from "next/link";

import { Section } from "@/components/page";
import { ArrowRightIcon } from "@/components/ui/icons";

import type { NextProjectLinkData } from "./projects-detail";

/** "Next project" link that chains the detail pages together. */
export function NextProjectLink({ name, href }: NextProjectLinkData) {
  return (
    <Section render={<Link href={href} />} className="next-proj">
      <div>
        <div className="npl">Next project</div>
        <div className="npn">{name}</div>
      </div>
      <ArrowRightIcon className="npa" aria-hidden />
    </Section>
  );
}

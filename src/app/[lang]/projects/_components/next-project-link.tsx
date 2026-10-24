import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";

import type { NextProjectLinkData } from "./projects-detail";

/** "Next project" link that chains the detail pages together. */
export function NextProjectLink({ name, href }: NextProjectLinkData) {
  return (
    <Link className="card next-proj" href={href}>
      <div>
        <div className="npl">Next project</div>
        <div className="npn">{name}</div>
      </div>
      <ArrowRightIcon className="npa" aria-hidden />
    </Link>
  );
}

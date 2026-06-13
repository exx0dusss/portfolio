import Link from "next/link";

import type { NextProjectLinkData } from "./projects-detail";

/** "Next project →" card that chains the detail pages together. */
export function NextProjectLink({ name, href }: NextProjectLinkData) {
  return (
    <Link className="card next-proj" href={href}>
      <div>
        <div className="npl">Next project</div>
        <div className="npn">{name}</div>
      </div>
      <span className="npa">→</span>
    </Link>
  );
}

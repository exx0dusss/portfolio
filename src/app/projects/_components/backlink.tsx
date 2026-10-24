import Link from "next/link";

import { ArrowLeftIcon } from "@/components/ui/icons";

/** "← Work" backlink shown at the top of every project hero. */
export function Backlink() {
  return (
    <Link className="backlink" href="/projects">
      <ArrowLeftIcon aria-hidden /> Work
    </Link>
  );
}

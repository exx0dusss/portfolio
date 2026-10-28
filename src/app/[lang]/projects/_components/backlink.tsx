"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getPreviousPath, restoreScrollOnNavigate } from "@/components/layout/history-scroll";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { splitLocale } from "@/i18n/config";

/** Pages that list the work, which the backlink can return to. */
const LISTS = ["/", "/projects"];

/** "← Work" backlink shown at the top of every project hero. Returns to the
 *  list the visitor came from (home or Work) at the same scroll position, so
 *  the title morphs back into its row; otherwise to Work. */
export function Backlink() {
  const router = useRouter();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // modified clicks (new tab, etc.) keep the plain link
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const previous = getPreviousPath();
    const target = previous && LISTS.includes(splitLocale(previous).path) ? previous : "/projects";
    restoreScrollOnNavigate(target);
    if (target !== "/projects") {
      event.preventDefault();
      router.push(target, { scroll: false });
    }
  };

  return (
    <Link className="backlink" href="/projects" scroll={false} onClick={onClick}>
      <ArrowLeftIcon aria-hidden /> Work
    </Link>
  );
}

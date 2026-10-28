"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getPreviousPath, restoreScrollOnNavigate } from "@/components/layout/history-scroll";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { useLocale } from "@/components/locale-link";
import { localePath, splitLocale } from "@/i18n/config";

/** Pages that list the work, which the backlink can return to. */
const LISTS = ["/", "/projects"];

/** "← Work" backlink shown at the top of every project hero. Returns to the
 *  list the visitor came from (home or Work) at the same scroll position, so
 *  the title morphs back into its row; otherwise to Work. */
export function Backlink() {
  const router = useRouter();
  // Work in the visitor's language
  const work = localePath(useLocale(), "/projects");

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // modified clicks (new tab, etc.) keep the plain link
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const previous = getPreviousPath();
    const target = previous && LISTS.includes(splitLocale(previous).path) ? previous : work;
    restoreScrollOnNavigate(target);
    if (target !== work) {
      event.preventDefault();
      router.push(target, { scroll: false });
    }
  };

  return (
    <Link
      className="mb-5.5 inline-flex items-center gap-2 text-13 text-fg-dim transition-backlink hover:gap-2.75 hover:text-accent-ink [&_svg]:size-3.5"
      href={work}
      scroll={false}
      onClick={onClick}
    >
      <ArrowLeftIcon aria-hidden /> Work
    </Link>
  );
}

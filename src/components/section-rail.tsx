"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocale } from "@/components/locale-link";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/cn";

/** Its one string, here like SectionAnchor's. */
const LABEL: Record<Locale, string> = {
  en: "On this page",
  uk: "На цій сторінці",
  ru: "На этой странице",
};

interface RailSection {
  id: string;
  label: string;
  /** the SectionGroup it sits in (Engineering), if any */
  group?: string;
}

/** The page's sections, read from the page itself: each one with an id and a
 *  label, named by the label (its note left out). */
function readSections(): RailSection[] {
  const sections = document.querySelectorAll<HTMLElement>(
    "[data-slot=page-shell] [data-slot=section][id]",
  );
  return [...sections].flatMap((section) => {
    const label = section.querySelector("[data-slot=section-label]");
    if (!label) return [];
    const name = label.cloneNode(true) as HTMLElement;
    name.querySelectorAll("[data-slot=section-note]").forEach((note) => note.remove());
    const group = section.closest<HTMLElement>("[data-slot=section-group]")?.dataset.label;
    return [{ id: section.id, label: name.textContent?.trim() ?? "", group }];
  });
}

/** The section being read: the last one whose top has passed a third of the
 *  way down the window, or the last one once the page is at its end. */
function currentSection(sections: RailSection[]): string | undefined {
  const line = window.innerHeight / 3;
  let current: string | undefined;
  for (const section of sections) {
    const top = document.getElementById(section.id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= line) current = section.id;
  }
  const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  return atEnd ? sections.at(-1)?.id : current;
}

/**
 * "On this page", in the right margin: a dash per section, the one being
 * read longer and named. Hovered or focused, it opens into the list of every
 * section, grouped (Engineering), each a link to it. From `wide:` screens
 * the margin has room for the current section's name; on narrower ones down
 * to `tablet:` it is just the dashes, in the page's gutter. Only on pages
 * with three sections or more.
 */
function SectionRail() {
  const pathname = usePathname();
  const lang = useLocale();
  const [rail, setRail] = useState<{ sections: RailSection[]; active?: string }>({
    sections: [],
  });

  useEffect(() => {
    // read once per page; follow the reader as they scroll
    const sections = readSections();
    const update = () => setRail({ sections, active: currentSection(sections) });
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const { sections, active } = rail;
  if (sections.length < 3) return null;

  return (
    <nav
      aria-label={LABEL[lang]}
      data-slot="section-rail"
      className="group/rail fixed top-1/2 right-2 z-40 hidden -translate-y-1/2 tablet:block print:hidden"
    >
      {/* Every state has a set width, so opening and closing can slide:
          the dashes alone (24px) in the gutter, 156px from wide: (past the
          border, dash and gap, the current name gets 124px, Performance and
          data included), and the open card at 224px */}
      <ol className="w-6 overflow-hidden rounded-14 border border-transparent py-2 transition-all duration-200 ease-pop group-focus-within/rail:w-56 group-focus-within/rail:border-line group-focus-within/rail:bg-card group-focus-within/rail:px-3 group-focus-within/rail:shadow-popover group-hover/rail:w-56 group-hover/rail:border-line group-hover/rail:bg-card group-hover/rail:px-3 group-hover/rail:shadow-popover motion-reduce:transition-none wide:w-39">
        {sections.map((section, index) => {
          // groups show only once the rail is open: a name over a group,
          // a little space before what follows it
          const startsGroup = index > 0 && section.group !== sections[index - 1].group;
          const isActive = section.id === active;
          return (
            <li
              key={section.id}
              className={cn(
                startsGroup &&
                  !section.group &&
                  "transition-all duration-200 ease-pop group-focus-within/rail:mt-2 group-hover/rail:mt-2",
              )}
            >
              {section.group && (startsGroup || index === 0) && (
                <div className="max-h-0 overflow-hidden text-11 font-medium whitespace-nowrap text-fg-faint opacity-0 transition-all duration-200 ease-pop group-focus-within/rail:max-h-8 group-focus-within/rail:pt-2 group-focus-within/rail:pb-1 group-focus-within/rail:opacity-100 group-hover/rail:max-h-8 group-hover/rail:pt-2 group-hover/rail:pb-1 group-hover/rail:opacity-100">
                  {section.group}
                </div>
              )}
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive || undefined}
                className="group/item flex items-center gap-1.5 py-1 text-12 text-fg-faint transition-colors duration-200 outline-none hover:text-fg focus-visible:text-fg data-active:text-fg"
              >
                <span className="h-1 w-4 flex-none rounded-full bg-current transition-all duration-200 ease-pop group-hover/item:w-6 group-data-active/item:w-6" />
                <span className="min-w-0 truncate opacity-0 transition-opacity duration-200 group-focus-within/rail:opacity-100 group-hover/rail:opacity-100 wide:group-data-active/item:opacity-100">
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { SectionRail };

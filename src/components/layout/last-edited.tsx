"use client";

import { usePathname } from "next/navigation";

import { type Locale, splitLocale } from "@/i18n/config";
import lastEdited from "@/lib/last-edited.json";

/** Dates as each language writes them: 31 October 2026, 31 жовтня 2026 р. */
const DATE_LOCALE: Record<Locale, string> = { en: "en-GB", uk: "uk-UA", ru: "ru-RU" };

/** "Last edited" and the date this page last changed (scripts/last-edited.mjs
 *  keeps the dates); nothing on a page without one. A client part of the
 *  footer, which the layout renders once for every page. */
export function LastEdited({ lang, label }: { lang: Locale; label: string }) {
  const { path } = splitLocale(usePathname());
  const date = (lastEdited as Record<string, string>)[path];
  if (!date) return null;

  const formatted = new Intl.DateTimeFormat(DATE_LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

  return (
    <span data-slot="last-edited">
      {label} <time dateTime={date}>{formatted}</time>
    </span>
  );
}

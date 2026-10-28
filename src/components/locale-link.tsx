"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localePath, splitLocale } from "@/i18n/config";

/** The language of the page being shown, from its URL. */
export function useLocale() {
  return splitLocale(usePathname()).lang;
}

/**
 * next/link for internal pages that keeps the visitor's language: an href
 * written as the English path ("/projects/exdbots") points to the same page
 * in the current language ("/uk/projects/exdbots"). Use it wherever a link's
 * target is written once for every language, e.g. in shared data.
 *
 *   <LocaleLink href="/resume">Résumé</LocaleLink>
 */
export function LocaleLink({
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  return <Link href={localePath(useLocale(), href)} {...props} />;
}

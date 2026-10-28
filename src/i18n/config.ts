/** Locales the site is published in. English is the default and lives at the
 *  unprefixed URLs (/, /projects…); the others are prefixed (/uk, /ru/projects…).
 *  proxy.ts maps unprefixed requests onto the [lang] segment. */
export const LOCALES = ["en", "uk", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Open Graph locale codes. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", uk: "uk_UA", ru: "ru_RU" };

/** Short labels for the language switcher ("UA" is what Ukrainians expect,
 *  even though the language code is "uk"). */
export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", uk: "UA", ru: "RU" };

/** Pages translated into every locale. Everything else (case studies, the
 *  résumé) is English-only for now. */
export const LOCALIZED_PATHS = ["/", "/projects", "/about", "/experience", "/certificates", "/reading", "/colophon"];

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Public URL path of `path` in `lang`, e.g. ("uk", "/reading") → "/uk/reading". */
export function localePath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Splits a public pathname into its locale and the locale-free path. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first) && first !== DEFAULT_LOCALE) {
    return { lang: first, path: `/${rest.join("/")}` };
  }
  return { lang: DEFAULT_LOCALE, path: pathname || "/" };
}

/** hreflang alternates for a translated page, including x-default. */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((lang) => [lang, localePath(lang, path)])),
    "x-default": path,
  };
}

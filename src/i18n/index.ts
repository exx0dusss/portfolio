import type { Metadata } from "next";

import { type Locale, languageAlternates, localePath, OG_LOCALE } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";
import { uk } from "./dictionaries/uk";

export * from "./config";
export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = { en, uk, ru };

export function getDictionary(lang: Locale): Dictionary {
  return DICTIONARIES[lang];
}

/** Metadata for a page translated into every locale: localized title and
 *  description, its canonical URL in `lang`, and hreflang alternates. */
export function localizedMetadata(
  lang: Locale,
  path: string,
  copy: { title?: string; description: string },
): Metadata {
  return {
    ...(copy.title ? { title: copy.title } : {}),
    description: copy.description,
    alternates: { canonical: localePath(lang, path), languages: languageAlternates(path) },
    // a page's openGraph replaces the layout's wholesale (including the
    // [lang]/opengraph-image card), so repeat the basics and the image
    openGraph: {
      type: "website",
      siteName: DICTIONARIES[lang].name,
      locale: OG_LOCALE[lang],
      url: localePath(lang, path),
      images: [
        {
          url: localePath(lang, "/opengraph-image"),
          width: 1200,
          height: 630,
          alt: DICTIONARIES[lang].meta.title,
        },
      ],
    },
  };
}

import type { MetadataRoute } from "next";

import { LOCALES, LOCALIZED_PATHS, languageAlternates, localePath } from "@/i18n/config";
import { SITE } from "@/lib/site";

import { PROJECTS } from "./_components/projects";

const absolute = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // translated pages: one entry per language, each listing all its alternates
  const localized = LOCALIZED_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, absolute(href)]),
    );
    return LOCALES.map((lang) => ({
      url: absolute(localePath(lang, path)),
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages },
    }));
  });

  // English-only pages
  const englishOnly = [
    { url: absolute("/resume"), priority: 0.7 },
    ...PROJECTS.map((project) => ({ url: absolute(project.href), priority: 0.8 })),
  ];

  return [...localized, ...englishOnly];
}

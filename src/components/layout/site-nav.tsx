"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaceIcon } from "@/components/ui/face-icon";
import { EnvelopeSimpleIcon } from "@/components/ui/icons";
import {
  LOCALE_LABEL,
  LOCALES,
  LOCALIZED_PATHS,
  type Locale,
  localePath,
  splitLocale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils/cn";

import { ThemeToggle } from "./theme-toggle";

interface SiteNavProps {
  lang: Locale;
  dict: Dictionary["nav"];
  name: string;
}

/** Sticky top navigation, shared across every page. Highlights the link
 *  whose section the current route belongs to, and switches language —
 *  to the same page where it's translated, otherwise to that language's home. */
export function SiteNav({ lang, dict, name }: SiteNavProps) {
  const { path } = splitLocale(usePathname());

  const links = [
    { label: dict.work, path: "/projects" },
    { label: dict.experience, path: "/experience" },
    { label: dict.reading, path: "/reading" },
    // the résumé is English-only for now
    { label: dict.resume, path: "/resume", englishOnly: true },
  ];
  const switchTarget = LOCALIZED_PATHS.includes(path) ? path : "/";

  return (
    <nav className="nav">
      <div className="nav-in">
        {/* aria-label keeps the link named when only the face shows (<400px) */}
        <Link className="brand" href={localePath(lang, "/")} aria-label={name}>
          <FaceIcon className="brand-face" />
          <span className="brand-text">
            <b>{name}</b>
            <span>{dict.role}</span>
          </span>
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.englishOnly ? link.path : localePath(lang, link.path)}
              className={cn(path.startsWith(link.path) && "active")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-end">
          <div className="lang-switch" role="group" aria-label={dict.language}>
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={localePath(locale, switchTarget)}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === lang ? "true" : undefined}
              >
                {LOCALE_LABEL[locale]}
              </Link>
            ))}
          </div>
          <ThemeToggle labels={dict.theme} />
          {/* plain <a>: on the home page this is a native in-page jump; elsewhere
              a normal load of home#contact — never routed, so the hash can't
              be doubled */}
          <a
            className="nav-cta"
            href={path === "/" ? "#contact" : `${localePath(lang, "/")}#contact`}
            aria-label={dict.contact}
          >
            <EnvelopeSimpleIcon aria-hidden /> <span className="nav-cta-text">{dict.contact}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

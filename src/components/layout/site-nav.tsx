"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaceIcon } from "@/components/ui/face-icon";
import { EnvelopeSimpleIcon, ListIcon, XIcon } from "@/components/ui/icons";
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

/** EN / UA / RU links to the current page where it's translated, otherwise
 *  to that language's home. */
function LangSwitch({ lang, path, label }: { lang: Locale; path: string; label: string }) {
  const target = LOCALIZED_PATHS.includes(path) ? path : "/";
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={localePath(locale, target)}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === lang ? "true" : undefined}
        >
          {LOCALE_LABEL[locale]}
        </Link>
      ))}
    </div>
  );
}

/** Sticky top navigation, shared across every page. On desktop the links,
 *  language and theme sit in the bar; below 860px they move into a menu
 *  panel opened from the bar. */
export function SiteNav({ lang, dict, name }: SiteNavProps) {
  const { path } = splitLocale(usePathname());
  const [open, setOpen] = useState(false);

  const links = [
    { label: dict.work, path: "/projects" },
    { label: dict.about, path: "/about" },
    { label: dict.experience, path: "/experience" },
    { label: dict.reading, path: "/reading" },
    // the résumé is English-only for now
    { label: dict.resume, path: "/resume", englishOnly: true },
  ];
  const href = (link: { path: string; englishOnly?: boolean }) =>
    link.englishOnly ? link.path : localePath(lang, link.path);
  const close = () => setOpen(false);

  // while the menu is open: Esc closes it and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="nav">
      <div className="nav-in">
        {/* aria-label keeps the link named when only the face shows (<400px) */}
        <Link className="brand" href={localePath(lang, "/")} aria-label={name} onClick={close}>
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
              href={href(link)}
              className={cn(path.startsWith(link.path) && "active")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-end">
          <div className="nav-desktop-only">
            <LangSwitch lang={lang} path={path} label={dict.language} />
            <ThemeToggle labels={dict.theme} />
          </div>
          {/* plain <a>: on the home page this is a native in-page jump; elsewhere
              a normal load of home#contact — never routed, so the hash can't
              be doubled */}
          <a
            className="nav-cta"
            href={path === "/" ? "#contact" : `${localePath(lang, "/")}#contact`}
            aria-label={dict.contact}
            onClick={close}
          >
            <EnvelopeSimpleIcon aria-hidden /> <span className="nav-cta-text">{dict.contact}</span>
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.menu.close : dict.menu.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon aria-hidden /> : <ListIcon aria-hidden />}
          </button>
        </div>
      </div>

      {/* inert while closed: hidden links stay out of tab order and AT */}
      <div id="mobile-menu" className="mobile-menu" data-open={open} inert={!open}>
        <ul>
          {[...links, { label: dict.certificates, path: "/certificates" }].map((link) => (
            <li key={link.path}>
              <Link
                href={href(link)}
                className={cn(path.startsWith(link.path) && "active")}
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-end">
          <LangSwitch lang={lang} path={path} label={dict.language} />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </nav>
  );
}

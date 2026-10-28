"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaceIcon } from "@/components/ui/face-icon";
import {
  BookOpenIcon,
  CertificateIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FolderSimpleIcon,
  ListIcon,
  PathIcon,
  UserIcon,
  XIcon,
} from "@/components/ui/icons";
import { LOCALE_LABEL, LOCALES, type Locale, localePath, splitLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cn } from "@/lib/utils/cn";
import { startLocaleSwitch, useEndLocaleSwitch } from "@/lib/locale-switch";
import { LOCALE_SWITCH } from "@/lib/view-transition";

import { NavButton } from "./nav-button";
import { ThemeToggle } from "./theme-toggle";

interface SiteNavProps {
  lang: Locale;
  dict: Dictionary["nav"];
  name: string;
}

/** EN / UA / RU links to the current page in each language (every page
 *  exists in all three; untranslated ones show their English text). Larger
 *  in the mobile menu. */
function LangSwitch({
  lang,
  path,
  label,
  inMenu = false,
}: {
  lang: Locale;
  path: string;
  label: string;
  inMenu?: boolean;
}) {
  return (
    <div
      className={cn("flex gap-0.5 font-mono text-12", inMenu && "text-14")}
      role="group"
      aria-label={label}
    >
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          className={cn(
            "rounded-6 px-1.75 py-1.25 text-fg-faint transition-colors duration-150 ease-standard hover:text-fg aria-[current=true]:bg-card-2 aria-[current=true]:text-fg",
            inMenu && "px-3 py-2",
          )}
          href={localePath(locale, path)}
          // the same page in another language: no title morph, no entrances
          transitionTypes={[LOCALE_SWITCH]}
          onClick={locale === lang ? undefined : startLocaleSwitch}
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
  useEndLocaleSwitch();

  // icons appear in the mobile menu only (on hover/focus, and for the page you're on)
  const links = [
    { label: dict.work, path: "/projects", Icon: FolderSimpleIcon },
    { label: dict.about, path: "/about", Icon: UserIcon },
    { label: dict.experience, path: "/experience", Icon: PathIcon },
    { label: dict.reading, path: "/reading", Icon: BookOpenIcon },
    { label: dict.resume, path: "/resume", Icon: FileTextIcon },
  ];
  const href = (link: { path: string }) => localePath(lang, link.path);
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
    <nav className="sticky top-0 z-50 border-b border-line bg-nav backdrop-blur-nav print:hidden">
      {/* links centred in the space between the brand and the controls, never
          closer than the column gap to either */}
      <div className="mx-auto grid h-17 max-w-page grid-cols-nav items-center gap-x-8 px-gutter max-nav:grid-cols-nav-compact">
        {/* aria-label keeps the link named when only the face shows (<400px) */}
        <Link
          className="group flex items-center gap-2.5 text-14 leading-brand"
          href={localePath(lang, "/")}
          aria-label={name}
          onClick={close}
        >
          {/* 32px, tilting on hover */}
          <FaceIcon motion="tilt" className="size-8" />
          {/* the role line goes first (<1180px), so the five links keep their
              air on small laptops; small phones show the name only, then
              (<400px) just the face */}
          <span className="flex flex-col max-tiny:hidden">
            <b className="font-semibold max-small:whitespace-nowrap">{name}</b>
            <span className="text-12.5 text-fg-faint max-laptop:hidden">{dict.role}</span>
          </span>
        </Link>
        {/* below ~1040px the links, language and theme controls no longer fit
            one row with room around them, so they move into the menu */}
        <div className="flex gap-7 justify-self-center text-14 max-nav:hidden">
          {links.map((link) => (
            <Link
              key={link.path}
              href={href(link)}
              className={cn(
                "relative text-fg-dim transition-colors duration-150 ease-standard after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-350 after:ease-pop hover:text-fg hover:after:scale-x-100",
                path.startsWith(link.path) && "text-fg after:scale-x-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2.5 justify-self-end">
          <div className="flex items-center gap-2.5 max-nav:hidden">
            <LangSwitch lang={lang} path={path} label={dict.language} />
            <ThemeToggle labels={dict.theme} />
          </div>
          {/* plain <a>: on the home page this is a native in-page jump; elsewhere
              a normal load of home#contact — never routed, so the hash can't
              be doubled */}
          <a
            className="inline-flex items-center gap-1.75 rounded-full bg-fg px-3.75 py-2.25 text-13.5 font-medium text-bg transition-press hover:-translate-y-0.5 hover:bg-ink-hover active:translate-y-0 active:scale-94 active:duration-100 max-small:p-2.25 [&_svg]:size-4"
            href={path === "/" ? "#contact" : `${localePath(lang, "/")}#contact`}
            aria-label={dict.contact}
            onClick={close}
          >
            <EnvelopeSimpleIcon aria-hidden />{" "}
            <span className="max-small:hidden">{dict.contact}</span>
          </a>
          <NavButton
            className="hidden text-fg max-nav:grid [&_svg]:size-5.5"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.menu.close : dict.menu.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon aria-hidden /> : <ListIcon aria-hidden />}
          </NavButton>
        </div>
      </div>

      {/* mobile menu (below 1040px): a panel directly under the bar. Absolute,
          not fixed — the nav's backdrop-filter makes it the containing block
          for fixed children. Inert while closed: hidden links stay out of tab
          order and AT. */}
      <div
        id="mobile-menu"
        className="invisible absolute inset-x-0 top-full hidden h-menu -translate-y-2 flex-col gap-7 overflow-y-auto bg-bg px-gutter pt-3 pb-8 opacity-0 transition-menu data-[open=true]:visible data-[open=true]:translate-none data-[open=true]:opacity-100 data-[open=true]:delay-0 max-nav:flex"
        data-open={open}
        inert={!open}
      >
        <ul>
          {[
            ...links,
            { label: dict.certificates, path: "/certificates", Icon: CertificateIcon },
          ].map(({ Icon, ...link }) => {
            const active = path.startsWith(link.path);
            return (
              <li key={link.path} className="border-b border-line">
                <Link
                  href={href(link)}
                  className={cn(
                    "group flex items-center gap-3 py-3.5 text-28 font-semibold tracking-heading text-fg",
                    active && "text-accent-ink",
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                >
                  {/* tucked away left of the label (its width plus the gap),
                        sliding in and pushing the label right on hover or
                        keyboard focus; the current page always shows its
                        icon, in the accent like its label */}
                  <Icon
                    className={cn(
                      "-ml-9 size-6 flex-none text-fg-faint opacity-0 transition-menu-icon group-hover:ml-0 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:opacity-100",
                      active && "ml-0 text-accent-ink opacity-100",
                    )}
                    aria-hidden
                  />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between">
          <LangSwitch lang={lang} path={path} label={dict.language} inMenu />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </nav>
  );
}

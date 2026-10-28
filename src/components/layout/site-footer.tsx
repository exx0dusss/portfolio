import Link from "next/link";

import { GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@/components/ui/icons";
import { type Dictionary, type Locale, localePath } from "@/i18n";

interface SiteFooterProps {
  lang: Locale;
  dict: Dictionary["footer"];
  name: string;
}

const linkClass =
  "inline-flex items-center gap-1.5 text-fg transition-colors duration-150 ease-standard hover:text-accent-ink [&_svg]:size-4.25";

/** Page footer, shared across every page. A hairline rule (the ::before,
 *  a full-width flex item) sits above the copyright and the links. */
export function SiteFooter({ lang, dict, name }: SiteFooterProps) {
  return (
    <footer className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-gutter pb-10 text-13.5 text-fg-dim before:mb-2 before:h-px before:basis-full before:bg-line print:hidden">
      <span>© 2026 {name}</span>
      <div className="flex flex-wrap gap-5.5">
        <Link href={localePath(lang, "/certificates")} className={linkClass}>
          {dict.certificates}
        </Link>
        <Link href={localePath(lang, "/colophon")} className={linkClass}>
          {dict.colophon}
        </Link>
        <a href="https://github.com/exx0dusss" className={linkClass}>
          <GithubLogoIcon aria-hidden /> GitHub
        </a>
        <a href="https://linkedin.com/in/tymur-mustafaiev-968b3724b" className={linkClass}>
          <LinkedinLogoIcon aria-hidden /> LinkedIn
        </a>
        <a href="https://x.com/exx0dvs" className={linkClass}>
          <XLogoIcon aria-hidden /> X
        </a>
      </div>
    </footer>
  );
}

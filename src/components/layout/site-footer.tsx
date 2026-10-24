import Link from "next/link";

import { GithubLogoIcon, LinkedinLogoIcon } from "@/components/ui/icons";
import { type Dictionary, type Locale, localePath } from "@/i18n";

interface SiteFooterProps {
  lang: Locale;
  dict: Dictionary["footer"];
  name: string;
}

/** Page footer, shared across every page. */
export function SiteFooter({ lang, dict, name }: SiteFooterProps) {
  return (
    <footer className="foot">
      <span>© 2026 {name}</span>
      <div className="foot-links">
        <Link href={localePath(lang, "/certificates")}>{dict.certificates}</Link>
        <a href="https://github.com/exx0dusss">
          <GithubLogoIcon aria-hidden /> GitHub
        </a>
        <a href="https://linkedin.com/in/tymur-mustafaiev-968b3724b">
          <LinkedinLogoIcon aria-hidden /> LinkedIn
        </a>
      </div>
    </footer>
  );
}

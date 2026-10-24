import Link from "next/link";

import { GithubLogoIcon, LinkedinLogoIcon } from "@/components/ui/icons";

/** Page footer, shared across every page. */
export function SiteFooter() {
  return (
    <footer className="foot">
      <span>© 2026 Tymur Mustafaiev</span>
      <div className="foot-links">
        <Link href="/certificates">Certificates</Link>
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

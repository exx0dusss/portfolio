import { FileTextIcon, MailIcon } from "lucide-react";
import Link from "next/link";

const EMAIL = "tymurmustafaiev029@gmail.com";
const GITHUB = "https://github.com/exx0dusss";
const LINKEDIN = "https://linkedin.com/in/tymur-mustafaiev-968b3724b";

/** Fixed quick-link dock. Only real destinations belong in global chrome. */
export function SiteDock() {
  return (
    <nav className="dock" data-slot="site-dock" aria-label="Quick links">
      <a
        className="dock-app"
        data-label="GitHub"
        href={GITHUB}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub (opens in a new tab)"
      >
        <span aria-hidden="true">GH</span>
      </a>
      <a
        className="dock-app"
        data-label="LinkedIn"
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in a new tab)"
      >
        <span aria-hidden="true">in</span>
      </a>
      <span className="dock-sep" aria-hidden="true" />
      <a className="dock-app primary" data-label="Email" href={`mailto:${EMAIL}`}>
        <MailIcon strokeWidth={1.8} aria-hidden="true" />
        <span className="sr-only">Email Tymur Mustafaiev</span>
      </a>
      <Link className="dock-app" data-label="Résumé" href="/resume" aria-label="Résumé">
        <FileTextIcon strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </nav>
  );
}

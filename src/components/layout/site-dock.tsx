import { FileTextIcon, MailIcon } from "lucide-react";
import Link from "next/link";

const EMAIL = "tymurmustafaiev029@gmail.com";
const GITHUB = "https://github.com/exx0dusss";
const LINKEDIN = "https://linkedin.com/in/tymur-mustafaiev-968b3724b";

interface SiteDockProps {
  name?: string;
  email?: string;
  socials?: Array<{ label: string; url: string }>;
}

/** Fixed quick-link dock. Only real destinations belong in global chrome. */
export function SiteDock({ name = "Tymur Mustafaiev", email = EMAIL, socials }: SiteDockProps) {
  const github = socials?.find(({ label }) => label.toLowerCase().includes("github"))?.url ?? GITHUB;
  const linkedin = socials?.find(({ label }) => label.toLowerCase().includes("linkedin"))?.url ?? LINKEDIN;

  return (
    <nav className="dock" data-slot="site-dock" aria-label="Quick links">
      <a
        className="dock-app"
        data-label="GitHub"
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub (opens in a new tab)"
      >
        <span aria-hidden="true">GH</span>
      </a>
      <a
        className="dock-app"
        data-label="LinkedIn"
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in a new tab)"
      >
        <span aria-hidden="true">in</span>
      </a>
      <span className="dock-sep" aria-hidden="true" />
      <a className="dock-app primary" data-label="Email" href={`mailto:${email}`}>
        <MailIcon strokeWidth={1.8} aria-hidden="true" />
        <span className="sr-only">Email {name}</span>
      </a>
      <Link className="dock-app" data-label="Résumé" href="/resume" aria-label="Résumé">
        <FileTextIcon strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </nav>
  );
}

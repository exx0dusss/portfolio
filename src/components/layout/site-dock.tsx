import Link from "next/link";
import { FileTextIcon, MailIcon } from "lucide-react";

const EMAIL = "tymurmustafaiev029@gmail.com";
const ICON_TINT = "1b1914"; // var(--foreground), for the monochrome brand glyphs

/** macOS-style dock of quick links, fixed bottom-center on every page.
 *  Brand glyphs come from the simpleicons CDN (tinted to the ink token);
 *  LinkedIn is a text tile because simpleicons pulled its trademarked logo. */
export function SiteDock() {
  return (
    <div className="dock" aria-label="Quick links">
      <Link className="dock-app" data-label="GitHub" href="https://github.com/exx0dusss">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote monochrome brand glyph */}
        <img src={`https://cdn.simpleicons.org/github/${ICON_TINT}`} alt="GitHub" />
      </Link>
      <a className="dock-app" data-label="Telegram" href="#">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote monochrome brand glyph */}
        <img src={`https://cdn.simpleicons.org/telegram/${ICON_TINT}`} alt="Telegram" />
      </a>
      <a className="dock-app" data-label="X / Twitter" href="#">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote monochrome brand glyph */}
        <img src={`https://cdn.simpleicons.org/x/${ICON_TINT}`} alt="X" />
      </a>
      <Link
        className="dock-app"
        data-label="LinkedIn"
        href="https://linkedin.com/in/tymur-mustafaiev-968b3724b"
      >
        <span>in</span>
      </Link>
      <span className="dock-sep" />
      <a className="dock-app primary" data-label="Email" href={`mailto:${EMAIL}`}>
        <MailIcon strokeWidth={1.8} aria-label="Email" />
      </a>
      <Link className="dock-app" data-label="Résumé" href="/resume">
        <FileTextIcon strokeWidth={1.8} aria-label="Résumé" />
      </Link>
    </div>
  );
}

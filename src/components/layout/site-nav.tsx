"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { EnvelopeSimpleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Reading", href: "/reading" },
  { label: "Résumé", href: "/resume" },
] as const;

/** Sticky top navigation, shared across every page. Highlights the link
 *  whose section the current route belongs to. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-in">
        <Link className="brand" href="/">
          <b>Tymur Mustafaiev</b>
          <span>Front-end engineer · Warsaw</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(pathname.startsWith(link.href) && "active")}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link className="nav-cta" href="/#contact">
          <EnvelopeSimpleIcon aria-hidden /> Get in touch
        </Link>
      </div>
    </nav>
  );
}

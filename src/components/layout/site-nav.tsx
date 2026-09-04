"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";

const LINKS = [
  { label: "Work", href: "/#work", match: "" },
  { label: "Experience", href: "/experience", match: "/experience" },
  { label: "Certificates", href: "/certificates", match: "/certificates" },
  { label: "Reading", href: "/reading", match: "/reading" },
  { label: "About", href: "/#about", match: "" },
] as const;

/** Sticky top navigation, shared across every page. Highlights the link that
 *  matches the current route (anchor links never highlight). */
export function SiteNav() {
  const pathname = usePathname();

  function linkClass(match: string) {
    return cn(match && pathname === match && "active");
  }

  return (
    <nav className="nav" data-slot="site-nav" aria-label="Primary navigation">
      <div className="nav-in">
        <Link className="brand" href="/" aria-label="Tymur Mustafaiev home">
          <span className="mk" aria-hidden="true">T</span> Tymur Mustafaiev
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.match)}
              aria-current={link.match === pathname ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link className="av" href="/#contact">
            <span className="dot" aria-hidden="true" />
            Available
          </Link>
        </div>
        <details className="nav-mobile">
          <summary aria-label="Open navigation">
            <MenuIcon aria-hidden="true" />
          </summary>
          <div className="nav-mobile-menu">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.match)}
                aria-current={link.match === pathname ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link className="av" href="/#contact">
              <span className="dot" aria-hidden="true" />
              Available
            </Link>
          </div>
        </details>
      </div>
    </nav>
  );
}

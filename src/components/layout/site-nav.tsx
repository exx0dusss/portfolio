"use client";

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

  return (
    <nav className="nav">
      <div className="nav-in">
        <Link className="brand" href="/">
          <span className="mk">T</span> Tymur Mustafaiev
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(link.match && pathname === link.match && "active")}
            >
              {link.label}
            </Link>
          ))}
          <Link className="av" href="/#contact">
            <span className="dot" />
            Available
          </Link>
        </div>
      </div>
    </nav>
  );
}

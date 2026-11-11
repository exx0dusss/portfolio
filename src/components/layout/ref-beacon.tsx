"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY = "ref";
const REF = /^[a-z0-9][a-z0-9-]{0,31}$/;

// one instance (in the root layout), so module state is enough
let lastPath: string | null = null;

function currentRef(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null; // storage blocked: the visit simply isn't followed
  }
}

function report(event: string, detail?: string) {
  const ref = currentRef();
  if (!ref) return;
  const payload = JSON.stringify({ ref, event, path: window.location.pathname, detail });
  navigator.sendBeacon("/api/ref", payload);
}

/**
 * Follows a visit that arrived through a ref link (`/?ref=supabase`) and
 * reports it to /api/ref: the link being opened, each page after it, and
 * taking the CV, the email or an outside link. A visit without a ref is
 * never reported. The ref lives in sessionStorage, so it ends with the tab.
 */
export function RefBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(KEY)?.toLowerCase();
    let first = false;
    if (fromUrl && REF.test(fromUrl) && currentRef() !== fromUrl) {
      try {
        sessionStorage.setItem(KEY, fromUrl);
        first = true;
      } catch {
        return;
      }
    }
    if (lastPath === pathname && !first) return;
    lastPath = pathname;
    report(first ? "open" : "page");
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.protocol === "mailto:") report("contact");
      else if (link.pathname.endsWith(".pdf")) report("cv");
      else if (link.host && link.host !== window.location.host) report("outbound", link.host);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

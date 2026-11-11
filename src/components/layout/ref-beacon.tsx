"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY = "ref";
const VISIT_KEY = "ref-visit";
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

/** This tab's visit: a random id, so its events collect in one place. */
function visitId(): string | null {
  try {
    let id = sessionStorage.getItem(VISIT_KEY);
    if (!id) {
      id = Array.from(crypto.getRandomValues(new Uint8Array(8)), (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
      sessionStorage.setItem(VISIT_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function report(event: string, detail?: string) {
  const ref = currentRef();
  const visit = visitId();
  if (!ref || !visit) return;
  const payload = JSON.stringify({ ref, visit, event, path: window.location.pathname, detail });
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
        sessionStorage.removeItem(VISIT_KEY); // a new ref is a new visit
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

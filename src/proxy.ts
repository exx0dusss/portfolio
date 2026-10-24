import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";

/**
 * Maps public URLs onto the app/[lang] segment. English is served unprefixed:
 * "/reading" is rewritten to "/en/reading", and "/en/…" redirects back to the
 * unprefixed URL so each page has one address. "/uk/…" and "/ru/…" pass
 * through. No Accept-Language redirect — visitors pick a language explicitly.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // Next emits the English card as /en/opengraph-image; serve it as is
  if (first === DEFAULT_LOCALE && pathname.endsWith("/opengraph-image")) {
    return NextResponse.next();
  }
  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (hasLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, files with an extension (icon.svg, robots.txt,
  // sitemap.xml, the CV PDF, …) and the root apple-icon route.
  matcher: ["/((?!_next|api|apple-icon|.*\\..*).*)"],
};

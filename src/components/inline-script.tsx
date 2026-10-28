"use client";

/**
 * An inline script that runs while the browser parses the server HTML, before
 * first paint (Next's "Preventing flash before hydration" guide). React warns
 * when rendering produces an executable <script>, so the client renders it as
 * type="text/plain" (inert); suppressHydrationWarning accepts the difference.
 * A client component, so the type check runs in the browser too: rendered
 * from a server component, the client would get the server's value.
 *
 *   <head><InlineScript html={THEME_SCRIPT} /></head>
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

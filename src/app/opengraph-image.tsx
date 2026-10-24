import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Shared social card, in the site's palette (see --color-* in globals.css). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          background: "#eceae4",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            borderRadius: 24,
            background: "#ffffff",
            color: "#1b1914",
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 2, color: "#2256d6" }}>
            FRONT-END ENGINEER &amp; UX/UI DESIGNER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>{SITE.name}</div>
            <div style={{ fontSize: 34, color: "#5d5b53" }}>
              I design and build interfaces — in TypeScript, across the stack.
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#98958c" }}>tymurmustafaiev.com · Warsaw, PL</div>
        </div>
      </div>
    ),
    size,
  );
}

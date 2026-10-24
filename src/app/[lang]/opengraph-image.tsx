import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { DEFAULT_LOCALE, getDictionary, hasLocale, LOCALES } from "@/i18n";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** One card per language, rendered at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const INK = "#0a0a0a";
const FAINT = "#737373";
const ACCENT = "#ff4f00";

/** Satori splits lines at punctuation ("Front-End", "Warsaw,") and then
 *  over-measures the following space, which reads as a double space.
 *  Non-breaking spaces keep each short line as one run. */
const nbsp = (text: string) => text.replaceAll(" ", "\u00a0");

/** Social card per language: who I am at a glance — the name as the
 *  headline, the role beneath, and the site's ink rule with the domain and
 *  location. */
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : DEFAULT_LOCALE);

  const fontDir = join(process.cwd(), "src/app/_og");
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#fff",
          color: INK,
          fontFamily: "Geist",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 1 }}>
          {dict.name}
          <span style={{ color: ACCENT, marginLeft: -10 }}>.</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 44, letterSpacing: -1, color: "#404040" }}>{nbsp(dict.meta.role)}</div>
        <div style={{ marginTop: 72, height: 2, background: INK }} />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: FAINT,
          }}
        >
          <span>tymurmustafaiev.com</span>
          <span>{nbsp(dict.meta.location)}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}

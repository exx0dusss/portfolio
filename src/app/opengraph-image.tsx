import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a0a";
const FAINT = "#737373";
const ACCENT = "#ff4f00";

/** Pixel size of the figure; its viewBox matches StickFigure's. */
const FIGURE = 420;
const SCALE = FIGURE / 570;
/** The section rule the figure stands on, as on the home page hero. */
const RULE_Y = 560;

/** Shared social card: the home hero in miniature — name and role, the
 *  headline, and the stick figure saying HI on the section rule. Satori
 *  can't render SVG <text> or clip paths, so "HI" is an HTML overlay and
 *  the head's shading is drawn without a clip. */
export default async function OpengraphImage() {
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
          position: "relative",
          background: "#fff",
          color: INK,
          fontFamily: "Geist",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 660 }}>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{SITE.name}</div>
          <div style={{ fontSize: 24, color: FAINT, marginTop: 4 }}>Front-end engineer · Warsaw</div>
          <div
            style={{
              marginTop: 92,
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
              flexWrap: "wrap",
              columnGap: 18,
            }}
          >
            {/* Satori lays children out as flex items, so words are separate
                boxes and the orange stop is glued to the last one */}
            {["I", "design", "and", "build", "web"].map((word) => (
              <span key={word}>{word}</span>
            ))}
            <span style={{ display: "flex" }}>
              products<span style={{ color: ACCENT, marginLeft: -4 }}>.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            top: RULE_Y,
            height: 2,
            background: INK,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            top: RULE_Y + 18,
            fontSize: 22,
            color: FAINT,
          }}
        >
          tymurmustafaiev.com
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            top: RULE_Y - FIGURE + 1,
            width: FIGURE,
            height: FIGURE,
            display: "flex",
          }}
        >
          <svg
            width={FIGURE}
            height={FIGURE}
            viewBox="0 -20 570 570"
            fill="none"
            stroke={INK}
            strokeWidth={14}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="362" cy="155" r="75" fill="#e5e5e5" stroke="none" />
            <circle cx="354" cy="140" r="70" fill="#fff" stroke="none" />
            <circle cx="362" cy="155" r="82" />
            <circle cx="325" cy="143" r="8" fill={INK} stroke="none" />
            <circle cx="399" cy="143" r="8" fill={INK} stroke="none" />
            <path d="M338 166 Q362 174 386 166" strokeWidth={6} />
            <path d="M362 237 L357 415" />
            <path d="M357 415 Q318 480 286 540" />
            <path d="M252 543 H296" />
            <path d="M357 415 Q412 455 430 540" />
            <path d="M428 543 H472" />
            <path d="M360 270 Q258 288 206 392" />
            <circle cx="199" cy="405" r="18" fill={INK} stroke="none" />
            <path d="M233.8 120.9 A120 85 0 1 0 202.1 150.1 L258 178 Z" fill="#fff" strokeWidth={10} />
            <path d="M360 270 L456 302 L530 222" />
            <circle cx="540" cy="210" r="18" fill={INK} stroke="none" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 125 * SCALE - 100,
              top: (85 + 20) * SCALE - 50,
              width: 200,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 104 * SCALE,
              fontWeight: 600,
              letterSpacing: -2,
              transform: "rotate(-6deg)",
            }}
          >
            HI
          </div>
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

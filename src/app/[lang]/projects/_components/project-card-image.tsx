import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";

import { PROJECTS } from "../../../_components/projects";

/** 1200×630 is the size every network crops well: Facebook, LinkedIn, X,
 *  WhatsApp, Telegram, Slack, Discord, iMessage, Reddit, Mastodon. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a0a";
const DIM = "#404040";
const FAINT = "#737373";
const LINE = "#e5e5e5";
const ACCENT = "#ff4f00";

/** Case studies are English-only, so their cards render once, in English. */
export function generateProjectCardParams() {
  return [{ lang: "en" }];
}

export function projectCardAlt(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug);
  return `${project?.title ?? slug}: a case study by ${SITE.name}`;
}

async function dataUri(publicPath: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  const type = publicPath.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${file.toString("base64")}`;
}

/** Satori over-measures the space after punctuation in short lines; non-
 *  breaking spaces keep each short run together (see the site card). */
const nbsp = (text: string) => text.replaceAll(" ", " ");

/** Wrapping text with even word spacing: Satori's own spaces come out uneven
 *  in long lines, so each word is its own box with a fixed gap. */
function Words({ text, gap }: { text: string; gap: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: gap }}>
      {text.split(" ").map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </div>
  );
}

/**
 * The social preview card for one case study, in the site card's style:
 * the project's favicon, its name with the accent dot, the one-line
 * description, and an ink rule over the address and facets. A screenshot
 * sits on the right when the project has a `cardImage`.
 */
export async function renderProjectCard(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) throw new Error(`No project "${slug}" in PROJECTS`);
  const copy = getDictionary("en").work.projects[slug];
  const meta = [...(copy?.facets ?? []), project.since && String(project.since)].filter(Boolean);

  const fontDir = join(process.cwd(), "src/app/_og");
  const [regular, semibold, favicon, cover] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
    project.favicon ? dataUri(project.favicon) : undefined,
    project.cardImage ? dataUri(project.cardImage) : undefined,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          color: INK,
          fontFamily: "Geist",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: FAINT }}>
              {favicon && (
                // eslint-disable-next-line @next/next/no-img-element -- Satori renders <img>
                <img
                  src={favicon}
                  width={52}
                  height={52}
                  alt=""
                  style={{ borderRadius: 12, border: `1px solid ${LINE}` }}
                />
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: ACCENT }} />
                <span>{nbsp("Case study")}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                // long names (ExdDownloaderApp) step down so they keep clear of the
                // edge; beside a cover the column is ~520px, and the name can't wrap
                fontSize: cover ? 72 : project.title.length > 14 ? 96 : 112,
                fontWeight: 600,
                letterSpacing: cover ? -3.5 : -5,
                lineHeight: 1,
              }}
            >
              {/* no trailing accent dot here: Satori measures a tightly
                  tracked name too wide, leaving a gap before it */}
              {nbsp(project.title)}
            </div>
            {copy?.description && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 30, lineHeight: 1.35, color: DIM }}>
                <Words text={copy.description} gap={8} />
              </div>
            )}
          </div>
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element -- Satori renders <img>
            <img
              src={cover}
              width={480}
              height={270}
              alt=""
              style={{
                borderRadius: 14,
                border: `1px solid ${LINE}`,
                boxShadow: "0 18px 40px rgba(27, 25, 20, 0.16)",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div style={{ marginTop: 40, height: 2, background: INK }} />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: FAINT,
          }}
        >
          <span>{`tymurmustafaiev.com${project.href}`}</span>
          <span>{nbsp(meta.join(" · "))}</span>
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

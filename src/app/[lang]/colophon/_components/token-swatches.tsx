import type { Dictionary } from "@/i18n";

type SwatchKey = keyof Dictionary["pages"]["colophon"]["swatches"];

/** The design tokens each swatch paints, read live from globals.css. */
const TOKENS: { key: SwatchKey; token: string }[] = [
  { key: "bg", token: "--bg" },
  { key: "surface", token: "--card-2" },
  { key: "fg", token: "--fg" },
  { key: "dim", token: "--fg-dim" },
  { key: "line", token: "--line-strong" },
  { key: "accent", token: "--accent" },
];

/** A row of colour swatches painted by the live tokens, so they change with
 *  the theme: each shows its name and the CSS variable behind it. Six tokens:
 *  one row on desktop, two even rows below 1040px (three on the narrowest
 *  phones). */
export function TokenSwatches({ labels }: { labels: Dictionary["pages"]["colophon"]["swatches"] }) {
  return (
    <ul className="mt-6.5 grid grid-cols-6 gap-2.5 max-nav:grid-cols-3 max-tiny:grid-cols-2">
      {TOKENS.map(({ key, token }) => (
        <li
          key={key}
          className="flex flex-col gap-1 rounded-card border border-line bg-card-2 px-2.5 pt-2.5 pb-3"
        >
          <span
            className="mb-1.5 h-12 rounded-8 border border-line bg-(--swatch)"
            style={{ "--swatch": `var(${token})` } as React.CSSProperties}
            aria-hidden
          />
          <span className="text-13.5 font-medium text-fg">{labels[key]}</span>
          <code className="font-mono text-12 text-fg-faint">{token}</code>
        </li>
      ))}
    </ul>
  );
}

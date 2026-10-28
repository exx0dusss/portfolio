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
 *  the theme: each shows its name and the CSS variable behind it. */
export function TokenSwatches({ labels }: { labels: Dictionary["pages"]["colophon"]["swatches"] }) {
  return (
    <ul className="swatches">
      {TOKENS.map(({ key, token }) => (
        <li key={key} className="swatch">
          <span
            className="swatch-chip"
            style={{ "--swatch": `var(${token})` } as React.CSSProperties}
            aria-hidden
          />
          <span className="swatch-name">{labels[key]}</span>
          <code className="swatch-token">{token}</code>
        </li>
      ))}
    </ul>
  );
}

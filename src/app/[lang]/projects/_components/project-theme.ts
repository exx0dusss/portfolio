import "./project-theme.css";

/** A project's accent for one theme: `accent` for shapes (meter, dots,
 *  rings; at least 3:1 on the page and tiles) and `ink` for small text (at
 *  least 4.5:1). */
interface ProjectAccent {
  accent: string;
  ink: string;
}

/**
 * Tints a case study in its project's colours: spread onto its PageShell and
 * every accent inside (links, focus rings, the difficulty meter, the
 * architecture diagram's highlighted node, selection) follows. The layout,
 * type and neutral surfaces stay the site's own; the nav keeps the site
 * accent. project-theme.css picks the light or dark set.
 *
 *   <PageShell {...projectTheme({ light: { accent, ink }, dark: { accent, ink } })}>
 */
export function projectTheme({ light, dark }: { light: ProjectAccent; dark: ProjectAccent }) {
  return {
    "data-project-theme": "",
    style: {
      "--project-accent": light.accent,
      "--project-accent-ink": light.ink,
      "--project-accent-dark": dark.accent,
      "--project-accent-ink-dark": dark.ink,
    } as React.CSSProperties,
  };
}

import "./project-banner.css";

type Four = [string, string, string, string];

/**
 * A case study's colours behind its hero: four soft fields in the project's
 * own palette drifting slowly into each other, fading into the page. Sits
 * behind the nav and the hero without taking any space. Decorative; the
 * colours hold still when the visitor prefers reduced motion.
 *
 * Each theme gets its own four: pale tints read on white, but over black
 * they turn grey, so the dark set is the same hues, deeper and more
 * saturated.
 *
 *   <ProjectBanner
 *     colors={{ light: ["#fdd795", …], dark: ["#e8a548", …] }}
 *   />
 *   <PageShell>…</PageShell>
 */
export function ProjectBanner({ colors }: { colors: { light: Four; dark: Four } }) {
  return (
    <div
      data-slot="project-banner"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-banner overflow-hidden opacity-90 mask-b-from-30% mask-b-to-100% dark:opacity-45"
      // the palettes go in as custom properties; project-banner.css paints
      // them and picks the set for the theme
      style={
        {
          "--banner-light-1": colors.light[0],
          "--banner-light-2": colors.light[1],
          "--banner-light-3": colors.light[2],
          "--banner-light-4": colors.light[3],
          "--banner-dark-1": colors.dark[0],
          "--banner-dark-2": colors.dark[1],
          "--banner-dark-3": colors.dark[2],
          "--banner-dark-4": colors.dark[3],
        } as React.CSSProperties
      }
    >
      <span data-slot="project-banner-field" />
      <span data-slot="project-banner-field" />
      <span data-slot="project-banner-field" />
      <span data-slot="project-banner-field" />
    </div>
  );
}

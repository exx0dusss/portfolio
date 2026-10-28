import "./project-banner.css";

/**
 * A case study's colours behind its hero: four soft fields in the project's
 * own palette drifting slowly into each other, fading into the page. Sits
 * behind the nav and the hero without taking any space. Decorative; the
 * colours hold still when the visitor prefers reduced motion.
 *
 *   <ProjectBanner colors={["#ffd790", "#c3a35a", "#b6816a", "#e3dec1"]} />
 *   <PageShell>…</PageShell>
 */
export function ProjectBanner({ colors }: { colors: [string, string, string, string] }) {
  return (
    <div
      data-slot="project-banner"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-banner overflow-hidden opacity-90 mask-b-from-30% mask-b-to-100% dark:opacity-40"
      // the palette goes in as custom properties; project-banner.css paints it
      style={
        {
          "--banner-1": colors[0],
          "--banner-2": colors[1],
          "--banner-3": colors[2],
          "--banner-4": colors[3],
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

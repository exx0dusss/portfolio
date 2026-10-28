/**
 * The project's colours across the top of its case study: a crop of its own
 * screenshots, full-bleed, softly blurred and faded into the page.
 * Decorative.
 * Render it before PageShell: it spans the viewport from the top of the
 * document and sits behind everything.
 *
 *   <ProjectBanner src="/projects/kosmetik-profi/banner.webp" />
 *   <PageShell>…</PageShell>
 */
export function ProjectBanner({ src }: { src: string }) {
  return (
    <div
      data-slot="project-banner"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-1 h-banner overflow-hidden mask-b-from-30% mask-b-to-100%"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- a small decorative crop, blurred */}
      <img
        src={src}
        alt=""
        decoding="async"
        className="size-full scale-125 object-cover opacity-(--banner-opacity) blur-banner saturate-150"
      />
    </div>
  );
}

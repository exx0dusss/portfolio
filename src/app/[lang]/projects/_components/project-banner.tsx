import Image from "next/image";

import "./project-banner.css";

/**
 * A case study's opening image: a sharp, full-bleed banner at the top of the
 * page that fades into it at the bottom, with the hero rising over the faded
 * part. As the page scrolls it blurs and dims (project-banner.css), so the
 * colour stays behind the hero without competing with it. Decorative: the
 * same screenshot is in the gallery with its description.
 *
 *   <ProjectBanner src="/projects/kosmetik-profi/hero.webp" />
 *   <PageShell>…</PageShell>
 */
export function ProjectBanner({ src }: { src: string }) {
  return (
    <div
      data-slot="project-banner"
      aria-hidden
      className="pointer-events-none relative -mb-32 h-banner overflow-hidden mask-b-from-40% mask-b-to-90% max-phone:-mb-20"
    >
      <Image
        data-slot="project-banner-image"
        src={src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-top"
      />
    </div>
  );
}

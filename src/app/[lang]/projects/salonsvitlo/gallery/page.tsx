import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { hasLocale } from "@/i18n";

import {
  ProjectBanner,
  ProjectHero,
  projectMetadata,
  projectTheme,
  ProjectTabs,
} from "../../_components";
import { ShotGallery } from "../../_components/gallery";
import {
  SALON_ACCENTS,
  SALON_BANNER,
  SALON_GALLERY_PATH,
  SALON_GROUPS,
  SALON_SHOTS,
  SALON_TABS,
} from "../_components/pages";

const SEO = {
  slug: "salonsvitlo",
  title: "SalonSvitlo gallery",
  description:
    "Screenshots of the SalonSvitlo storefront, shot on demo data: catalogue, product pages, checkout, the customer’s account and the same flows on a phone.",
};

export const metadata: Metadata = {
  ...projectMetadata(SEO),
  alternates: { canonical: SALON_GALLERY_PATH },
};

/** Every storefront screenshot, the second of the case study's two tabs. */
export default async function SalonSvitloGalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      <ProjectBanner {...SALON_BANNER} />
      <PageShell lang="en" {...projectTheme(SALON_ACCENTS)}>
        <ProjectHero
          name="SalonSvitlo"
          favicon="/projects/salonsvitlo/favicon.png"
          faviconFilled
          tagline="The storefront, screen by screen, on a phone and on a desktop."
          meta={[
            { key: "Screenshots", value: String(SALON_SHOTS.length), sub: "click one to enlarge" },
            { key: "Shown on", value: "Demo data", sub: "the shop’s catalogue, made-up customer" },
            {
              key: "Status",
              value: "In development",
              sub: "release planned for end of autumn 2026",
            },
          ]}
          openness={{ tone: "client", label: "Client work · private" }}
        />
        <ProjectTabs tabs={SALON_TABS} current={SALON_GALLERY_PATH} />

        <Section id="screenshots">
          <SectionLabel>Screenshots</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                A real build of the storefront running on demo data. Products, prices and photos are
                the shop’s own; the customer, orders, reviews, labels and stock levels are made up.
                The back office is closed and isn’t shown, and more of the storefront will be added
                here once it is live.
              </p>
            </Prose>
          </div>
          <ShotGallery groups={SALON_GROUPS} slides={SALON_SHOTS} />
        </Section>
      </PageShell>
    </>
  );
}

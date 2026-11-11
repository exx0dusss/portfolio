import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell, Prose, Section, SectionGroup, SectionLabel } from "@/components/page";
import { TechLink } from "@/components/tech-link";
import { hasLocale } from "@/i18n";

import {
  DesignNote,
  FeatureGrid,
  GalleryCover,
  LockedNote,
  NextProjectLink,
  OpenGalleryButton,
  ProjectBanner,
  ProjectCover,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
  ProjectTabs,
} from "../_components";
import { ShotGallery } from "../_components/gallery";
import {
  SALON_ACCENTS,
  SALON_BANNER,
  SALON_COVER,
  SALON_GALLERY_PATH,
  SALON_MORE_SHOT,
  SALON_PREVIEW,
  SALON_SHOTS,
  SALON_SLIDES,
  SALON_TABS,
} from "./_components/pages";

const SEO = {
  slug: "salonsvitlo",
  title: "SalonSvitlo",
  description:
    "A full-stack e-commerce product for a lighting business with 20+ years in the trade: a storefront with about 23,000 products, guest checkout and order tracking, plus a closed back office.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function SalonSvitloPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      <ProjectBanner {...SALON_BANNER} />
      <PageShell lang="en" {...projectTheme(SALON_ACCENTS)}>
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="SalonSvitlo"
          favicon="/projects/salonsvitlo/favicon.png"
          faviconFilled
          tagline="A full-stack e-commerce product for a lighting business with 20+ years in the trade — its storefront, landing and Telegram bot."
          meta={[
            { key: "Year", value: "2024 — present", sub: "this platform since March 2026" },
            { key: "Role", value: "Full-stack developer", sub: "storefront, API & back office" },
            { key: "Type", value: "E-commerce platform", sub: "storefront and closed back office" },
            {
              key: "Status",
              value: "In development",
              sub: "release planned for end of autumn 2026",
            },
          ]}
          difficulty={{ level: 5, label: "Very hard" }}
          openness={{ tone: "client", label: "Client work · private" }}
          stack={[
            "tanstack-start",
            "react",
            "tailwind",
            "nestjs",
            "drizzle",
            "postgresql",
            "redis",
            "bullmq",
            "better-auth",
            "docker",
            "github",
            "sentry",
          ]}
          extraActions={<OpenGalleryButton count={SALON_SLIDES.length} />}
        />
        <ProjectTabs tabs={SALON_TABS} current="/projects/salonsvitlo" />

        <Section>
          <ProjectCover>
            <GalleryCover
              cover={{
                placeholder: SALON_COVER.title,
                src: SALON_COVER.src,
                alt: SALON_COVER.alt,
              }}
            />
          </ProjectCover>
        </Section>

        <Section id="overview">
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="max-w-tagline">
              SalonSvitlo is a lighting business in Dnipro with more than twenty years in the trade.
              I’m building its new commerce platform: the public storefront, a landing page and a
              Telegram bot around it, and the back office that runs the shop.
            </p>
            <p style={{ marginTop: 18 }}>
              The storefront is the part I can show. It sells about{" "}
              <strong>23,000 lamps, chandeliers and fittings from 37 brands</strong>, in Ukrainian
              and English, with delivery by Nova Poshta and Ukrposhta, payment by card, Apple Pay,
              Google Pay, Monobank or instalments, and pickup from the showroom.
            </p>
            <p>
              It isn’t live yet. The domain salonsvitlo.com.ua still serves the shop’s old Horoshop
              site, and the new storefront is due to replace it at the end of autumn 2026. The
              screenshots on this page are a real build running on demo data: the products, prices
              and photos are the shop’s own, while the customer, orders, reviews, labels and stock
              levels are made up.
            </p>
          </Prose>
        </Section>

        <Section id="features">
          <SectionLabel>What’s in the storefront</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Catalogue",
                title: "Filters built from the data",
                description:
                  "Every category filters by the attributes its products really have — colour, socket, power, size — and the counts follow each pick.",
              },
              {
                fn: "Search",
                title: "Suggestions as you type",
                description:
                  "Category chips, popular queries and product matches appear while typing, backed by Meilisearch.",
              },
              {
                fn: "Product",
                title: "Prices that explain themselves",
                description:
                  "A discount ladder by order total, free delivery from ₴2,000, stock with a dispatch date, and a calculator that says how many fixtures a room needs.",
              },
              {
                fn: "Cart",
                title: "A cart that nudges",
                description:
                  "A bar toward free delivery and the next discount step, and bulbs matched to each fixture’s sockets.",
              },
              {
                fn: "Checkout",
                title: "No account needed",
                description:
                  "Guest checkout in three steps: contacts, delivery by Nova Poshta, Ukrposhta, courier, locker or the showroom, then payment.",
              },
              {
                fn: "Account",
                title: "Orders you can follow",
                description:
                  "A status timeline with Nova Poshta tracking, returns within 14 days, saved addresses, a wishlist and a loyalty discount tier.",
              },
              {
                fn: "Content",
                title: "Guides and a style quiz",
                description:
                  "Buying guides by room and fixture type, and a short quiz that suggests a style.",
              },
              {
                fn: "Phones",
                title: "The same flows on a phone",
                description:
                  "A bottom tab bar, filter and cart sheets and a sticky buy bar, so nothing on desktop is missing on a phone.",
              },
            ]}
          />
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <ShotGallery
            groups={[{ shots: SALON_PREVIEW }]}
            slides={SALON_SLIDES}
            more={{
              href: SALON_GALLERY_PATH,
              count: SALON_SHOTS.length - SALON_PREVIEW.length,
              shot: SALON_MORE_SHOT,
            }}
          />
        </Section>

        <SectionGroup label="Engineering">
          <Section id="how-it-was-built">
            <SectionLabel>How it was built</SectionLabel>
            <Prose>
              <p>
                The platform is one monorepo: the storefront, the API, the back office and the
                landing page share their contracts, design tokens and one CI pipeline. Its history
                starts on 25 March 2026, and in the months since it has grown to around{" "}
                <strong>11,900 commits</strong>, 274 database migrations and over a hundred written
                design decisions.
              </p>
              <p>
                The storefront is a <TechLink id="tanstack-start" /> app on <TechLink id="react" />{" "}
                and <TechLink id="tailwind" />. It talks to a <TechLink id="nestjs" /> API with{" "}
                <TechLink id="drizzle" /> on <TechLink id="postgresql" />, queues on{" "}
                <TechLink id="bullmq" /> and <TechLink id="redis" />, and{" "}
                <TechLink id="better-auth" /> for accounts. Search runs on Meilisearch. Product
                photos are cut to AVIF and WebP on demand, so a page downloads the width it needs
                and not the original.
              </p>
              <p>
                Releases are <TechLink id="docker" /> images built in <TechLink id="github" />{" "}
                Actions, with <TechLink id="sentry" /> watching both ends.
              </p>
            </Prose>
          </Section>

          <Section id="hard-parts">
            <SectionLabel>The hard parts</SectionLabel>
            <Prose>
              <p>
                <strong>A catalogue nobody typed in.</strong> About 23,000 products arrive from many
                sources, each with its own names, attributes and photos. Most of the work is turning
                that into one catalogue before a filter or a search result can mean anything.
              </p>
              <p>
                <strong>Filters that stay honest.</strong> Counts have to follow what the shopper
                has picked but not yet applied, across attributes of very different shapes. It’s the
                kind of feature that looks finished long before it is.
              </p>
              <p>
                <strong>Pricing in layers.</strong> Several kinds of discount can apply to one
                order. They have to combine in a predictable way, and the page has to show the
                shopper why the price is what it is.
              </p>
              <p>
                <strong>Five repositories into one.</strong> Merging the storefront, API, back
                office and shared packages kept every commit’s history, and left one set of
                dependencies and one pipeline where there had been five.
              </p>
            </Prose>
          </Section>

          <Section id="back-office">
            <SectionLabel>The back office</SectionLabel>
            <Prose>
              <p>
                Behind the storefront a staff CRM runs the shop. It belongs to the client, so it has
                no screenshots here and no internals. What I can say is its size: it covers about a
                dozen areas — catalogue curation, orders and fulfilment, stock and suppliers,
                customers and their conversations, marketing, finance documents, reports and staff
                access — on close to <strong>90 backend modules</strong> that it shares with the
                storefront.
              </p>
            </Prose>
            <LockedNote title="Closed system">
              The hard parts were keeping one catalogue consistent from many sources, imports that
              run for a long time and still let a person review them, and a permission model fine
              enough for a small team.
            </LockedNote>
          </Section>
        </SectionGroup>

        <Section id="design">
          <SectionLabel>Design</SectionLabel>
          <DesignNote
            callout="This page wears SalonSvitlo’s own colours."
            swatches={[
              { name: "Mustard", hex: "#e9c60b" },
              { name: "Pale mustard", hex: "#f8ecaa" },
              { name: "Warm grey", hex: "#ebeae8" },
              { name: "Graphite", hex: "#2b2825" },
            ]}
          >
            <p>
              The gradient behind the title is the storefront’s mustard, the colour of its logo and
              its buy button, glowing over the page’s warm grey. In the dark theme it deepens and
              the grey gives way to the graphite of the storefront’s header.
            </p>
            <p>
              Links and the difficulty meter use a darker mustard so that they stay readable on
              white, the same shade the storefront keeps for text on its light surfaces.
            </p>
          </DesignNote>
        </Section>

        <NextProjectLink name="ExdDownloadApp" href="/projects/exd-download-app" />
      </PageShell>
    </>
  );
}

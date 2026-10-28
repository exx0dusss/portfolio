import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LivePreview } from "@/components/live-preview";
import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { TechLink } from "@/components/tech-link";
import { hasLocale } from "@/i18n";

import {
  FeatureGrid,
  Gallery,
  GalleryCover,
  NextProjectLink,
  OpenGalleryButton,
  ProjectBanner,
  ProjectCover,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
  projectTheme,
  SketchDiagram,
} from "../_components";

/** The cover is also the first gallery slide, so all five screenshots open together. */
const COVER = {
  placeholder: "Homepage",
  src: "/projects/kosmetik-profi/hero.webp",
  alt: "Kosmetik Profi homepage: the practice name, a short introduction and a booking button beside photos of the studio",
};

const SEO = {
  slug: "kosmetik-profi",
  title: "Kosmetik Profi",
  description:
    "Website and admin panel for a cosmetology practice in Münster: a bilingual price list of 53 services, booking for two locations, and an admin it runs itself.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function KosmetikProfiPage({ params }: { params: Promise<{ lang: string }> }) {
  // every language serves the page; its text is English (lang="en" on the shell)
  if (!hasLocale((await params).lang)) notFound();
  return (
    <>
      {/* the site's booking-button gradient (apricot, cream-peach) and its gold,
          dissolving into the page; deeper versions of the same hues for dark */}
      <ProjectBanner
        colors={{
          light: ["#fdd795", "#ffeccc", "#f2c98a", "#ffffff"],
          dark: ["#c98b3c", "#8a5a2b", "#b8964f", "#0c0c0c"],
        }}
        pattern={{ offsetX: 0.15, offsetY: -0.1, rotation: 25 }}
      />
      {/* accents in the same honey gold: AA-checked shades for shapes and text */}
      <PageShell
        lang="en"
        {...projectTheme({
          light: { accent: "#bf7f24", ink: "#8f5a12" },
          dark: { accent: "#e8a548", ink: "#f2be6e" },
        })}
      >
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="Kosmetik Profi"
          favicon="/projects/kosmetik-profi/favicon.png"
          tagline="Website and admin panel for a cosmetology practice in Münster — a bilingual price list, booking for two locations, and an admin the practice runs on its own."
          meta={[
            { key: "Year", value: "2024 — present", sub: "maintained since launch" },
            { key: "Built", value: "2 days", sub: "to the first version" },
            { key: "Role", value: "Web developer", sub: "admin panel design, hosting & deploys" },
            { key: "Type", value: "Business website", sub: "with an admin panel" },
          ]}
          difficulty={{ level: 1, label: "Very easy" }}
          openness={{ tone: "client", label: "Client work · live site" }}
          stack={[
            "nestjs",
            "handlebars",
            "typeorm",
            "sqlite",
            "jwt",
            "docker",
            "coolify",
            "ovhcloud",
          ]}
          actions={[
            {
              variant: "primary",
              label: "Visit site",
              href: "https://kosmetikprof.de",
              external: true,
            },
          ]}
          extraActions={
            <>
              <LivePreview url="https://kosmetikprof.de/?lang=de" />
              <OpenGalleryButton count={5} />
            </>
          }
        />

        <Section>
          <ProjectCover>
            <GalleryCover cover={COVER} />
          </ProjectCover>
        </Section>

        <Section id="overview">
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="max-w-tagline">
              A cosmetology practice with two studios in Münster needed one clear place for its
              treatments, prices and bookings — in German and English.
            </p>
            <p style={{ marginTop: 18 }}>
              The practice offers face, body, nail and hair treatments, distributes a professional
              cosmetics line in Germany and trains other cosmetologists. Its price list runs to{" "}
              <strong>53 services in six categories</strong>, and prices change often enough that
              they couldn&#8217;t live in hard-coded pages.
            </p>
            <p>
              I built the site from a provided design: the public page and the backend behind it.
              The <strong>admin panel</strong> I designed as well as built, so the owner can keep
              every service and price current without calling a developer.
            </p>
          </Prose>
        </Section>

        <Section id="features">
          <SectionLabel>What&#8217;s in it</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Site",
                title: "Price list",
                description:
                  "Services grouped into category tabs. The chosen category is kept in the URL, so a shared link opens the right list.",
              },
              {
                fn: "Admin",
                title: "Admin panel",
                description:
                  "My own design: a login, then screens to add, edit and remove categories and services in both languages, with “from” prices where they vary.",
              },
              {
                fn: "Booking",
                title: "Two locations",
                description:
                  "Booking starts by choosing a studio, each with its map, then hands off to that studio’s EasyWeek booking page.",
              },
              {
                fn: "i18n",
                title: "German & English",
                description:
                  "Every page and service in both languages, plus the Impressum and Datenschutz pages German law requires.",
              },
            ]}
          />
        </Section>

        <Section id="architecture">
          <SectionLabel>Architecture</SectionLabel>
          <div className="mb-5.5">
            <Prose>
              <p>
                One small server renders every page. Visitors and the admin panel read and write the
                same data, so a price changed in the admin is live on the next page load.
              </p>
            </Prose>
          </div>
          <SketchDiagram
            slug="kosmetik-profi"
            alt="Architecture sketch. A visitor's browser gets its pages from a NestJS app and itself loads EasyWeek booking, an embedded Google Map and Google Tag Manager; the admin logs in and edits the price list through the same app. NestJS and its SQLite file share one Docker container on an OVHcloud VPS, which Coolify rebuilds when main changes on GitHub."
            note="// one server, one database file — sized for a single practice"
          />
        </Section>

        <Section id="how-it-was-built">
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              The first version took <strong>two days</strong>. The repository starts on 15 December
              2024 with the public page and the admin already working, and by the next day the admin
              had its final three screens: login, categories and services. It went live in January
              2025, packaged in <TechLink id="docker" />.
            </p>
            <p>
              Pages are rendered on the server with <TechLink id="nestjs" /> and{" "}
              <TechLink id="handlebars" />. A local business needs a page that loads fast and shows
              up in search, not a client-side app. The data sits in <TechLink id="sqlite" /> through{" "}
              <TechLink id="typeorm" />: the right size for one practice, with no separate database
              to run.
            </p>
            <p>
              I also set up where it runs. I helped the practice get its domain, configured the DNS,
              and set up an <TechLink id="ovhcloud" /> VPS with <TechLink id="coolify" />, which
              builds the Docker image and redeploys the site whenever a change is merged into the
              main branch. It&#8217;s a minimal DevOps setup, but a complete one: a merged pull
              request reaches the live site without anyone logging into the server.
            </p>
            <p>
              I&#8217;ve kept maintaining it since: &#8220;from&#8221; prices and the location
              picker with <TechLink id="easyweek" /> booking in 2025, legal pages and shareable
              category links in 2026. In October 2026 a responsive pass fixed prices colliding with
              long German service names and lined the cards up across each row with{" "}
              <TechLink id="css-subgrid" />.
            </p>
          </Prose>
        </Section>

        <Section id="review">
          <SectionLabel>My review</SectionLabel>
          <Prose>
            <p>
              I picked this stack because the website did not need anything super special. It did
              not need <TechLink id="react" /> and <TechLink id="nextjs" />. At the time, I have
              been already building applications with <TechLink id="nestjs" /> as backend while
              learning it from <TechLink id="udemy" /> courses, official documentation and practise.
              It is a very convenient framework, and coming from{" "}
              <TechLink id="spring">Java Spring</TechLink> that I have been learning in university
              for quite a while, the NestJS was the best way for me to build backends.
            </p>
            <p>
              I decided to try out <TechLink id="handlebars" /> as a frontend technology for a few
              reasons: I wanted to try something new for a simple project, I heard a lot of template
              engines at that time, especially after work with <TechLink id="thymeleaf" /> and it
              was an interesting experience for backend to serve the <TechLink id="html" /> as in
              old good times.
            </p>
            <p>
              I can say that it was a pure joy to build on that stack and each time I return to the
              website to maintain it, I can easily understand the code I wrote at that time. And
              even after a few years after I built it and moved fully to React, I can still
              understand the application code because it was very straightforward and I can say I
              wrote it very well. I usually dont say that about my older apps.
            </p>
          </Prose>
        </Section>

        <Section id="gallery">
          <SectionLabel>Gallery</SectionLabel>
          <Gallery
            cover={COVER}
            items={[
              {
                placeholder: "Services",
                wide: true,
                src: "/projects/kosmetik-profi/services.webp",
                alt: "Services section: category tabs above a three-column grid of treatments with prices",
              },
              {
                placeholder: "Permanent make-up",
                src: "/projects/kosmetik-profi/services-permanent-makeup.webp",
                alt: "The Permanent Make-up category selected, listing treatments and their prices",
              },
              {
                placeholder: "Booking",
                src: "/projects/kosmetik-profi/booking-locations.webp",
                alt: "Booking dialog asking the visitor to choose one of two Münster locations, each with a map",
              },
              {
                placeholder: "On phones",
                wide: true,
                src: "/projects/kosmetik-profi/mobile-pair.webp",
                alt: "The homepage and the services list on a phone",
              },
            ]}
          />
        </Section>

        <NextProjectLink name="Giga Psych" href="/projects/giga-psych" />
      </PageShell>
    </>
  );
}

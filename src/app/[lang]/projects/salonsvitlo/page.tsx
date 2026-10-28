import type { Metadata } from "next";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { ImageSlot } from "@/components/ui/image-slot";
import { requireEnglish } from "@/i18n";

import {
  ArchDiagram,
  FeatureGrid,
  Gallery,
  NextProjectLink,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
} from "../_components";

const SEO = {
  slug: "salonsvitlo",
  title: "SalonSvitlo",
  description:
    "A full-stack e-commerce product for a lighting business with 20+ years in the trade — storefront, landing, a CRM to run it, and a Telegram bot with a web-app.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function SalonSvitloPage({ params }: { params: Promise<{ lang: string }> }) {
  await requireEnglish(params);
  return (
    <>
      <PageShell>
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="SalonSvitlo"
          tagline="A full-stack e-commerce product for a lighting business with 20+ years in the trade — storefront, landing, a CRM to run it, and a Telegram bot with a web-app."
          meta={[
            { key: "Year", value: "2024 — present" },
            { key: "Role", value: "Full-stack — design & build" },
            { key: "Type", value: "E-commerce platform" },
          ]}
          openness={{ tone: "client", label: "Client work · private" }}
        />

        <Section>
          <div className="p-cover">
            <ImageSlot
              shape="rect"
              placeholder="Drop a cover screenshot (storefront)"
              style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16/9" }}
            />
          </div>
        </Section>

        <Section>
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="lead-q">
              A lighting shop with two decades of experience, but no real digital presence.
              SalonSvitlo is the whole stack that brought the business online — and gave the team
              the tools to run it.
            </p>
            <p style={{ marginTop: 18 }}>
              SalonSvitlo is more than a store. The customer side is a modern storefront and landing
              built on current UX practices; the business side is a <strong>CRM</strong> that
              handles orders, customer chat, and day-to-day operations — plus an AI assistant that
              can act on the store, and a Telegram bot with a web-app for customers who live in
              chat.
            </p>
            <p>
              The aim was to maximize how involved a traditional business can be in its own tech:
              one connected system instead of a storefront bolted onto spreadsheets.
            </p>
          </Prose>
        </Section>

        <Section>
          <SectionLabel>What&#8217;s in it</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "Shop",
                title: "Storefront & landing",
                description:
                  "A modern online store and marketing site, designed with current UX and conversion practices.",
              },
              {
                fn: "CRM",
                title: "Operations console",
                description:
                  "Order management, customer chat, and the daily tools the team needs to run the business.",
              },
              {
                fn: "AI",
                title: "Store assistant",
                description:
                  "An AI chatbot that can act on the store — answering and handling operations rather than just FAQ.",
              },
              {
                fn: "Bot",
                title: "Telegram web-app",
                description:
                  "A Telegram bot with a web-app surface, meeting customers where they already are.",
              },
            ]}
          />
        </Section>

        <Section id="architecture">
          <SectionLabel>Architecture</SectionLabel>
          <div style={{ marginBottom: 22 }}>
            <Prose>
              <p>
                Storefront, Telegram bot, and the AI assistant all read and write through one core —
                the CRM and its data layer.
              </p>
            </Prose>
          </div>
          <ArchDiagram
            columns={[
              {
                title: "Customer",
                nodes: [
                  { title: "Storefront", sub: "Next.js" },
                  { title: "Telegram web-app", sub: "Mini App" },
                ],
              },
              {
                title: "Core",
                nodes: [
                  { title: "CRM", sub: "orders · chat · ops", accent: true },
                  { title: "AI assistant", sub: "acts on store" },
                ],
              },
              {
                title: "Services",
                nodes: [
                  { title: "Payments", sub: "Stripe" },
                  { title: "Catalog & orders", sub: "API" },
                ],
              },
              {
                title: "Data",
                nodes: [{ title: "PostgreSQL", sub: "products · customers" }],
              },
            ]}
            note="// one core, many surfaces — store, chat, and AI share the same data"
          />
        </Section>

        <Section>
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              The challenge wasn&#8217;t any single feature — it was making a traditional business
              comfortable owning a connected system. I designed the storefront and the CRM as two
              faces of the same data, so an order placed in chat, on the web, or by phone all lands
              in one place.
            </p>
            <p>
              The AI assistant was the piece that made it click for the client: instead of another
              dashboard to learn, they can ask the store to do things. It&#8217;s a Next.js +
              Postgres stack with Stripe for payments and a Telegram Mini App for the bot surface.
            </p>
          </Prose>
        </Section>

        <Section>
          <SectionLabel>Gallery</SectionLabel>
          <Gallery
            items={[
              { placeholder: "Storefront", wide: true },
              { placeholder: "CRM" },
              { placeholder: "Telegram web-app" },
            ]}
          />
        </Section>

        <NextProjectLink name="ExdDownloaderApp" href="/projects/exd-downloader-app" />
      </PageShell>
    </>
  );
}

import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";
import { ImageSlot } from "@/components/ui/image-slot";

import {
  ArchDiagram,
  FeatureGrid,
  Gallery,
  NextProjectLink,
  ProjectHero,
  SectionLabel,
} from "../_components";

export const metadata: Metadata = {
  title: "MyLamp",
  description: "A full-stack e-commerce product for a lighting business.",
};

export default function MylampPage() {
  return (
    <>
      <main className="shell">
        <ProjectHero
          icon="M"
          name="MyLamp"
          tagline="A full-stack e-commerce product for a lighting business with 20+ years in the trade — storefront, landing, a CRM to run it, and a Telegram bot with a web-app."
          meta={[
            { key: "Year", value: "2024 — present" },
            { key: "Role", value: "Full-stack — design & build" },
            { key: "Type", value: "E-commerce platform" },
          ]}
          openness={{ tone: "client", label: "Client work · private" }}
          actions={[
            {
              variant: "ghost",
              label: "Salon-Svitlo org",
              href: "https://github.com/Salon-Svitlo",
              external: true,
            },
          ]}
        />

        <section className="card">
          <div className="p-cover">
            <ImageSlot
              shape="rect"
              placeholder="Drop a cover screenshot (storefront)"
              style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16/9" }}
            />
          </div>
        </section>

        <section className="card">
          <SectionLabel num="01">Overview</SectionLabel>
          <Reveal className="prose">
            <p className="lead-q">
              A lighting shop with two decades of experience, but no real digital presence. MyLamp is
              the whole stack that brought the business online — and gave the team the tools to run
              it.
            </p>
            <p>
              MyLamp is more than a store. The customer side is a modern storefront and landing built
              on current UX practices; the business side is a <strong>CRM</strong> that handles
              orders, customer chat, and day-to-day operations — plus an AI assistant that can act on
              the store, and a Telegram bot with a web-app for customers who live in chat.
            </p>
            <p>
              The aim was to maximize how involved a traditional business can be in its own tech: one
              connected system instead of a storefront bolted onto spreadsheets.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="02">What&#8217;s in it</SectionLabel>
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
        </section>

        <section className="card" id="architecture">
          <SectionLabel num="03">Architecture</SectionLabel>
          <div className="section-intro">
            <Reveal className="prose">
              <p>
                Storefront, Telegram bot, and the AI assistant all read and write through one core —
                the CRM and its data layer.
              </p>
            </Reveal>
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
        </section>

        <section className="card">
          <SectionLabel num="04">How it was built</SectionLabel>
          <Reveal className="prose">
            <p>
              The challenge wasn&#8217;t any single feature — it was making a traditional business
              comfortable owning a connected system. I designed the storefront and the CRM as two
              faces of the same data, so an order placed in chat, on the web, or by phone all lands in
              one place.
            </p>
            <p>
              The AI assistant was the piece that made it click for the client: instead of another
              dashboard to learn, they can ask the store to do things. It&#8217;s a Next.js + Postgres
              stack with Stripe for payments and a Telegram Mini App for the bot surface.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="05">Gallery</SectionLabel>
          <Gallery
            items={[
              { placeholder: "Storefront", wide: true },
              { placeholder: "CRM" },
              { placeholder: "Telegram web-app" },
            ]}
          />
        </section>

        <NextProjectLink name="exd-tiktok-bot" href="/projects/exd-tiktok-bot" />
      </main>
      <NavDots />
    </>
  );
}

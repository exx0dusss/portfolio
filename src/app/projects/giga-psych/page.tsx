import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import {
  FeatureGrid,
  LockedNote,
  NextProjectLink,
  ProjectHero,
  SectionLabel,
} from "../_components";

export const metadata: Metadata = {
  title: "Giga Psych",
  description: "A research data exploration platform built with PJATK XR Lab.",
};

export default function GigaPsychPage() {
  return (
    <>
      <main className="shell">
        <ProjectHero
          icon="G"
          name="Giga Psych"
          tagline="A web platform for exploring psychological research datasets, built with the PJATK XR Lab and researchers at the University of Amsterdam."
          meta={[
            { key: "Year", value: "2023 — 2024" },
            { key: "Role", value: "Full-stack developer" },
            { key: "Type", value: "Research tooling" },
          ]}
          openness={{ tone: "nda", label: "Research · under NDA" }}
        />

        <section className="card">
          <SectionLabel num="01">Overview</SectionLabel>
          <Reveal className="prose">
            <p className="lead-q">
              Research data is only useful if the people who collected it can actually explore it.
              This platform turned a pile of experimental data into something a research team could
              query.
            </p>
            <p>
              Giga Psych was a collaboration between the <strong>PJATK XR Lab</strong> and researchers
              at the <strong>University of Amsterdam</strong>. I built the web interface that lets the
              team browse, filter, and query datasets from their experiments without writing SQL by
              hand.
            </p>
            <p>
              Because this is active academic research, the specifics of the data and findings are
              confidential — so this page stays at the level of what I built and how, rather than what
              the data showed.
            </p>
          </Reveal>
        </section>

        <section className="card">
          <SectionLabel num="02">What I built</SectionLabel>
          <FeatureGrid
            features={[
              {
                fn: "UI",
                title: "Dataset explorer",
                description:
                  "A web interface to browse and filter experimental datasets, designed for researchers rather than engineers.",
              },
              {
                fn: "Query",
                title: "Visual querying",
                description:
                  "Building and running queries through the interface, with results presented as readable tables and charts.",
              },
              {
                fn: "Data",
                title: "Postgres backend",
                description:
                  "A schema and API over the experimental data, keeping access structured and reproducible.",
              },
              {
                fn: "Viz",
                title: "Data visualization",
                description:
                  "Charts to make patterns in the data legible at a glance for the research team.",
              },
            ]}
          />
        </section>

        <section className="card">
          <SectionLabel num="03">How it was built</SectionLabel>
          <Reveal className="prose">
            <p>
              The brief was unusual for me: the users were researchers, not customers, and the goal
              was clarity over polish. I worked closely with the lab to understand how they thought
              about their data, then shaped the interface around their mental model instead of the
              database schema.
            </p>
            <p>
              It&#8217;s a React front-end over a Postgres-backed API. The interesting work was in the
              querying layer — letting non-engineers ask precise questions of the data and get back
              something they could trust and cite.
            </p>
          </Reveal>
          <LockedNote title="Details limited">
            Screenshots and dataset specifics are withheld under the research agreement. Happy to talk
            through my contribution in an interview.
          </LockedNote>
        </section>

        <NextProjectLink name="MyLamp" href="/projects/mylamp" />
      </main>
      <NavDots />
    </>
  );
}

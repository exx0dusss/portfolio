import type { Metadata } from "next";

import { PageShell, Prose, Section, SectionLabel } from "@/components/page";
import { requireEnglish } from "@/i18n";

import {
  FeatureGrid,
  LockedNote,
  NextProjectLink,
  ProjectHero,
  projectMetadata,
  ProjectStructuredData,
} from "../_components";

const SEO = {
  slug: "giga-psych",
  title: "Giga Psych",
  description:
    "A web platform for exploring psychological research datasets, built with the PJATK XR Lab and researchers at the University of Amsterdam.",
};

export const metadata: Metadata = projectMetadata(SEO);

export default async function GigaPsychPage({ params }: { params: Promise<{ lang: string }> }) {
  await requireEnglish(params);
  return (
    <>
      <PageShell>
        <ProjectStructuredData {...SEO} />
        <ProjectHero
          name="Giga Psych"
          tagline="A web platform for exploring psychological research datasets, built with the PJATK XR Lab and researchers at the University of Amsterdam."
          meta={[
            { key: "Year", value: "2023 — 2024" },
            { key: "Role", value: "Full-stack developer" },
            { key: "Type", value: "Research tooling" },
          ]}
          openness={{ tone: "nda", label: "Research · under NDA" }}
        />

        <Section>
          <SectionLabel>Overview</SectionLabel>
          <Prose>
            <p className="lead-q">
              Research data is only useful if the people who collected it can actually explore it.
              This platform turned a pile of experimental data into something a research team could
              query.
            </p>
            <p style={{ marginTop: 18 }}>
              Giga Psych was a collaboration between the <strong>PJATK XR Lab</strong> and
              researchers at the <strong>University of Amsterdam</strong>. I built the web interface
              that lets the team browse, filter, and query datasets from their experiments without
              writing SQL by hand.
            </p>
            <p>
              Because this is active academic research, the specifics of the data and findings are
              confidential — so this page stays at the level of what I built and how, rather than
              what the data showed.
            </p>
          </Prose>
        </Section>

        <Section>
          <SectionLabel>What I built</SectionLabel>
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
        </Section>

        <Section>
          <SectionLabel>How it was built</SectionLabel>
          <Prose>
            <p>
              The brief was unusual for me: the users were researchers, not customers, and the goal
              was clarity over polish. I worked closely with the lab to understand how they thought
              about their data, then shaped the interface around their mental model instead of the
              database schema.
            </p>
            <p>
              It&#8217;s a React front-end over a Postgres-backed API. The interesting work was in
              the querying layer — letting non-engineers ask precise questions of the data and get
              back something they could trust and cite.
            </p>
          </Prose>
          <LockedNote title="Details limited">
            Screenshots and dataset specifics are withheld under the research agreement. Happy to
            talk through my contribution in an interview.
          </LockedNote>
        </Section>

        <NextProjectLink name="SalonSvitlo" href="/projects/salonsvitlo" />
      </PageShell>
    </>
  );
}

import type { Icon } from "@phosphor-icons/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageShell,
  PageTitle,
  Prose,
  Section,
  SectionLabel,
} from "@/components/page";
import { TechLink } from "@/components/tech-link";
import {
  Fact,
  FactDescription,
  FactHeader,
  FactIcon,
  FactLabel,
  Facts,
  FactValue,
} from "@/components/ui/fact";
import {
  CloudArrowUpIcon,
  CodeIcon,
  CubeIcon,
  PaintBrushIcon,
  StackIcon,
  TranslateIcon,
} from "@/components/ui/icons";
import { getDictionary, hasLocale, localizedMetadata } from "@/i18n";
import type { TechId } from "@/lib/tech";

import { ArchDiagram, FeatureGrid } from "../projects/_components";
import { TokenSwatches } from "./_components/token-swatches";

type Props = { params: Promise<{ lang: string }> };

type FactKey = keyof ReturnType<typeof getDictionary>["pages"]["colophon"]["facts"];

const FACT_ICONS: Record<FactKey, Icon> = {
  framework: CubeIcon,
  language: CodeIcon,
  components: StackIcon,
  styling: PaintBrushIcon,
  hosting: CloudArrowUpIcon,
  languages: TranslateIcon,
};

/** What the site is built with, as logo chips that preview each project. */
const STACK: TechId[] = [
  "nextjs",
  "react",
  "typescript",
  "tailwind",
  "shadcn",
  "base-ui",
  "motion",
  "phosphor",
  "simple-icons",
  "geist",
  "lightbox",
  "vercel",
  "cloudflare",
  "github",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/colophon", getDictionary(lang).pages.colophon);
}

/** Colophon: how this site is built — stack, architecture, design, quality,
 *  and why this stack. Linked from the footer. */
export default async function ColophonPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getDictionary(lang).pages.colophon;

  return (
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
        <Facts columns={3} className="mt-6">
          {(Object.keys(FACT_ICONS) as FactKey[]).map((key) => {
            const FactGlyph = FACT_ICONS[key];
            const fact = page.facts[key];
            return (
              <Fact key={key}>
                <FactHeader>
                  <FactIcon>
                    <FactGlyph />
                  </FactIcon>
                  <FactLabel>{fact.label}</FactLabel>
                </FactHeader>
                <FactValue>{fact.value}</FactValue>
                <FactDescription>{fact.sub}</FactDescription>
              </Fact>
            );
          })}
          <Fact span="full">
            <FactHeader>
              <FactIcon>
                <StackIcon />
              </FactIcon>
              <FactLabel>{page.stack}</FactLabel>
            </FactHeader>
            <ul className="stack-list">
              {STACK.map((id) => (
                <li key={id}>
                  <TechLink id={id} variant="chip" />
                </li>
              ))}
            </ul>
          </Fact>
        </Facts>
      </PageHeader>

      <Section>
        <SectionLabel>{page.sections.architecture}</SectionLabel>
        <div className="mb-5.5">
          <Prose>
            <p>{page.architecture.intro}</p>
          </Prose>
        </div>
        <ArchDiagram columns={page.architecture.columns} note={page.architecture.note} />
      </Section>

      <Section>
        <SectionLabel>{page.sections.design}</SectionLabel>
        <Prose>
          {page.design.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <Reveal>
          <TokenSwatches labels={page.swatches} />
        </Reveal>
      </Section>

      <Section>
        <SectionLabel>{page.sections.quality}</SectionLabel>
        <FeatureGrid features={page.quality} />
      </Section>

      <Section>
        <SectionLabel>{page.sections.story}</SectionLabel>
        <Prose>
          {page.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
      </Section>
    </PageShell>
  );
}

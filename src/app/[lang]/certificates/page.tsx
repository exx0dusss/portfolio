import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import {
  PageEyebrow,
  PageHeader,
  PageLead,
  PageShell,
  PageTitle,
  Section,
  SectionLabel,
} from "@/components/page";
import { getDictionary, hasLocale, localizedMetadata } from "@/i18n";
import { CERTIFICATES } from "@/lib/certificates";

import { CertificateCard } from "./_components/certificate-card";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return localizedMetadata(lang, "/certificates", getDictionary(lang).pages.certificates);
}

export default async function CertificatesPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const page = getDictionary(lang).pages.certificates;

  return (
    <PageShell>
      <PageHeader>
        <PageEyebrow>{page.title}</PageEyebrow>
        <PageTitle>{page.heading}</PageTitle>
        <PageLead>{page.lead}</PageLead>
      </PageHeader>

      <Section>
        <SectionLabel>{page.credentials}</SectionLabel>
        <Stagger className="grid grid-cols-2 gap-3.5 max-phone:grid-cols-1">
          {CERTIFICATES.map((certificate) => (
            <StaggerItem key={certificate.id}>
              <CertificateCard certificate={certificate} copy={page} lang={lang} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </PageShell>
  );
}

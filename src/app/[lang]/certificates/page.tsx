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

import { CertificateCard } from "./_components/certificate-card";
import { CERTIFICATES } from "./_components/certificates";

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
        <Stagger className="cert-list">
          {CERTIFICATES.map((certificate) => (
            <StaggerItem key={certificate.title}>
              {/* course titles stay in their original English */}
              <CertificateCard
                certificate={{
                  ...certificate,
                  issuer: certificate.issuer === "Course" ? page.course : certificate.issuer,
                }}
                verifyLabel={page.verify}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </PageShell>
  );
}

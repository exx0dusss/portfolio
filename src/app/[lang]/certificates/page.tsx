import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
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
    <main className="shell">
      <header className="card">
        <Reveal className="clabel">{page.title}</Reveal>
        <Reveal as="h1" delay={1} className="page-title">
          {page.heading}
        </Reveal>
        <Reveal as="p" delay={2} className="page-lead">
          {page.lead}
        </Reveal>
      </header>

      <section className="card">
        <Reveal as="h2" className="clabel">
          {page.credentials}
        </Reveal>
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
      </section>
    </main>
  );
}

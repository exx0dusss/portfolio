import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

import { CertificateCard } from "./_components/certificate-card";
import { CERTIFICATES } from "./_components/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Courses and certifications completed by Tymur Mustafaiev across front-end, back-end, and fundamentals — including Vercel’s official Next.js courses.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal as="div" className="clabel">
            Certificates
          </Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            Courses &amp; certifications.
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            Online courses I&rsquo;ve completed across front-end, back-end, and the fundamentals
            &mdash; including the official Next.js courses from Vercel.
          </Reveal>
        </header>

        <section className="card">
          <Reveal as="div" className="clabel">
            Credentials
          </Reveal>
          <Stagger className="cert-list">
            {CERTIFICATES.map((certificate) => (
              <StaggerItem key={certificate.title}>
                <CertificateCard certificate={certificate} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </main>
    </>
  );
}

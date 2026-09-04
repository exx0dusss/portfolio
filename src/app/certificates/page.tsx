import type { Metadata } from "next";

import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { CertificateCard } from "./_components/certificate-card";
import { CERTIFICATES } from "./_components/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Courses and certifications completed by Tymur Mustafaiev.",
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
            <span className="num">01</span> Credentials
          </Reveal>
          <Reveal className="cert-grid">
            {CERTIFICATES.map((certificate) => (
              <CertificateCard key={certificate.title} certificate={certificate} />
            ))}
          </Reveal>
        </section>
      </main>
      <NavDots />
    </>
  );
}

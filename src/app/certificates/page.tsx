import type { Metadata } from "next";

import { getCmsCertificates, getCmsPage } from "@/lib/cms/repository";
import { NavDots } from "@/components/layout/nav-dots";
import { Reveal } from "@/components/motion/reveal";

import { CertificateCard } from "./_components/certificate-card";
import { certificateFromCms, CERTIFICATES } from "./_components/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Courses and certifications completed by Tymur Mustafaiev.",
};

export default async function CertificatesPage() {
  const [cmsCertificates, pageCopy] = await Promise.all([
    getCmsCertificates(),
    getCmsPage("certificates"),
  ]);
  const certificates = cmsCertificates?.length
    ? cmsCertificates.map(certificateFromCms)
    : CERTIFICATES;

  return (
    <>
      <main className="shell">
        <header className="card">
          <Reveal as="div" className="clabel">
            {pageCopy?.eyebrow ?? "Certificates"}
          </Reveal>
          <Reveal as="h1" delay={1} className="page-title">
            {pageCopy?.heading ?? "Courses & certifications."}
          </Reveal>
          <Reveal as="p" delay={2} className="page-lead">
            {pageCopy?.lead ??
              "Online courses I’ve completed across front-end, back-end, and the fundamentals — including the official Next.js courses from Vercel."}
          </Reveal>
        </header>

        <section className="card">
          <Reveal as="div" className="clabel">
            <span className="num">01</span> Credentials
          </Reveal>
          <Reveal className="cert-grid">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.title} certificate={certificate} />
            ))}
          </Reveal>
        </section>
      </main>
      <NavDots />
    </>
  );
}

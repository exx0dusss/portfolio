import { ArrowUpRightIcon } from "@/components/ui/icons";

import type { Certificate } from "./certificates";

/** One credential: course title and issuer, plus a verify link for courses
 *  that have a public page. */
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { title, issuer, href } = certificate;

  return (
    <article className="cert">
      <div>
        <div className="ct">{title}</div>
        <div className="ci">{issuer}</div>
      </div>
      {href ? (
        <a className="cl" href={href} target="_blank" rel="noopener">
          Verify <ArrowUpRightIcon aria-hidden />
        </a>
      ) : null}
    </article>
  );
}

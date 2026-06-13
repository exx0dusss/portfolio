import { ImageSlot } from "@/components/ui/image-slot";

import type { Certificate } from "./certificates";

const BADGE_TINT = "1b1914"; // var(--foreground), for the monochrome brand glyphs

/** One credential in the certificates grid: a capture slot, the course title,
 *  the issuer badge, and — for courses that have a public page — a verify link. */
export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { title, issuer, badgeIcon, href } = certificate;

  return (
    <article className="cert">
      <ImageSlot shape="rect" className="cap" style={{ aspectRatio: "16 / 10" }} placeholder="Certificate" />
      <div className="meta">
        <div className="ct">{title}</div>
        <div className="ci">
          {badgeIcon ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote monochrome brand glyph
            <img
              src={`https://cdn.simpleicons.org/${badgeIcon}/${BADGE_TINT}`}
              alt=""
              width={13}
              height={13}
              style={{ verticalAlign: "-2px", marginRight: 6 }}
            />
          ) : null}
          {issuer}
        </div>
        {href ? (
          <a className="cl" href={href} target="_blank" rel="noopener">
            Verify <span className="a">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

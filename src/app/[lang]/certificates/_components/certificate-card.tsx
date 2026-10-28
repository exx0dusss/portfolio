import { ArrowUpRightIcon } from "@/components/ui/icons";

import type { Certificate } from "./certificates";

/** One credential: course title and issuer, plus a verify link for courses
 *  that have a public page. A plain list row; the first one in the list (its
 *  StaggerItem is the first child) drops the rule and top padding. */
export function CertificateCard({
  certificate,
  verifyLabel,
}: {
  certificate: Certificate;
  verifyLabel: string;
}) {
  const { title, issuer, href } = certificate;

  return (
    <article className="flex items-baseline justify-between gap-6 border-t border-line py-4 [:first-child>&]:border-t-0 [:first-child>&]:pt-0">
      <div>
        <div className="text-15.5 font-semibold tracking-snug">{title}</div>
        <div className="mt-0.5 text-13.5 text-fg-dim">{issuer}</div>
      </div>
      {href ? (
        <a
          className="inline-flex flex-none items-center gap-1.5 text-13.5 text-fg transition-colors duration-150 ease-standard hover:text-accent-ink [&_svg]:size-3.75"
          href={href}
          target="_blank"
          rel="noopener"
        >
          {verifyLabel} <ArrowUpRightIcon aria-hidden />
        </a>
      ) : null}
    </article>
  );
}

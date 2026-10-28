import { BrandIcon } from "@/components/ui/brand-icon";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { LinkPreviewBody, LinkPreviewSite, LinkPreviewTitle } from "@/components/ui/link-preview";
import type { Dictionary, Locale } from "@/i18n";
import { getTech } from "@/lib/tech";

import type { Certificate } from "./certificates";

type CertificateCopy = Dictionary["pages"]["certificates"];

/** "2025-06" → "Jun 2025", in the page's language. */
function formatIssued(issued: string, lang: Locale) {
  const [year, month] = issued.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1)),
  );
}

/** Issuer logo and name, with an "Outdated" tag for rewritten courses. */
function CertificateIssuer({
  certificate,
  copy,
}: {
  certificate: Certificate;
  copy: CertificateCopy;
}) {
  const issuer = getTech(certificate.issuer);
  return (
    <LinkPreviewSite icon={<BrandIcon name={issuer.name} mark={issuer.mark} size="sm" />}>
      {issuer.name}
      {certificate.outdated && (
        <span className="ml-1 rounded-full border border-line px-1.75 text-11.5 leading-normal text-fg-dim">
          {copy.outdated}
        </span>
      )}
    </LinkPreviewSite>
  );
}

/** One row of the dialog's details. */
function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 max-small:flex-col max-small:gap-0.5">
      <dt className="w-30 flex-none text-fg-faint">{label}</dt>
      <dd className="m-0 min-w-0 break-words text-fg">{children}</dd>
    </div>
  );
}

/**
 * One credential, laid out like LinkedIn's list: a gallery card with the
 * certificate (cropped to its top, where the issuer and title are), issuer,
 * title, issue date and credential ID. Clicking opens a dialog with the whole certificate, the
 * credential's details and a link to its public page.
 */
export function CertificateCard({
  certificate,
  copy,
  lang,
}: {
  certificate: Certificate;
  copy: CertificateCopy;
  lang: Locale;
}) {
  const { title, image, href, hours, skills, credentialId, outdated } = certificate;
  const issued = formatIssued(certificate.issued, lang);

  return (
    <Dialog>
      <DialogTrigger
        render={<Card variant="interactive" render={<button type="button" />} />}
        className="size-full"
      >
        <div className="aspect-640/336 w-full overflow-hidden border-b border-line bg-card-2">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element -- local snapshot, sized by the script
            <img
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="block size-full object-cover object-top"
            />
          )}
        </div>
        <LinkPreviewBody>
          <CertificateIssuer certificate={certificate} copy={copy} />
          <LinkPreviewTitle>{title}</LinkPreviewTitle>
          {/* issued, then the credential ID (cut to one line; the dialog has it whole) */}
          <div className="mt-1 flex flex-col text-12.5 text-fg-faint">
            <span>
              {copy.issued} {issued}
            </span>
            <span className="truncate">
              {copy.credentialId} {credentialId}
            </span>
          </div>
        </LinkPreviewBody>
      </DialogTrigger>
      <DialogContent size="wide">
        <div className="flex flex-col gap-4">
          {/* pr-10 keeps the title clear of the close button */}
          <div className="pr-10">
            <DialogHeader>
              <CertificateIssuer certificate={certificate} copy={copy} />
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element -- local snapshot, sized by the script
            <img
              src={image.src}
              alt={title}
              width={image.width}
              height={image.height}
              decoding="async"
              className="block h-auto w-full rounded-10 border border-line"
            />
          )}
          {outdated && <DialogDescription>{copy.outdatedNote}</DialogDescription>}
          <dl className="m-0 flex flex-col gap-2 text-13.5">
            <Detail label={copy.issued}>{issued}</Detail>
            <Detail label={copy.credentialId}>{credentialId}</Detail>
            {hours !== undefined && (
              <Detail label={copy.length}>
                {hours.toLocaleString(lang)} {copy.hoursUnit}
              </Detail>
            )}
            <Detail label={copy.skills}>{skills.join(", ")}</Detail>
          </dl>
          <DialogFooter>
            <ButtonLink href={href} target="_blank" rel="noopener" size="sm">
              {copy.showCredential} <ArrowUpRightIcon aria-hidden />
            </ButtonLink>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

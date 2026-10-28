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
import { ArrowUpRightIcon, CertificateIcon } from "@/components/ui/icons";
import {
  LinkPreviewBody,
  LinkPreviewMedia,
  LinkPreviewSite,
  LinkPreviewTitle,
} from "@/components/ui/link-preview";
import { getTech } from "@/lib/tech";

import type { Certificate } from "./certificates";

/** The course page's preview image, or the issuer's logo (a certificate mark
 *  for courses without one) where the page has none or blocks snapshots. */
function CertificateMedia({
  certificate,
  variant,
}: {
  certificate: Certificate;
  variant?: "edge" | "framed";
}) {
  const issuer = certificate.issuer && getTech(certificate.issuer);
  return (
    <LinkPreviewMedia src={certificate.preview?.image} variant={variant}>
      {issuer ? (
        <BrandIcon name={issuer.name} mark={issuer.mark} size="lg" />
      ) : (
        <span className="grid size-16 place-items-center rounded-16 border border-line bg-card text-fg-dim [&_svg]:size-8">
          <CertificateIcon aria-hidden />
        </span>
      )}
    </LinkPreviewMedia>
  );
}

/**
 * One credential as a gallery card: the course page's preview, issuer and
 * title. Clicking opens a dialog with the course description and a link to
 * its public page.
 */
export function CertificateCard({
  certificate,
  issuerFallback,
  verifyLabel,
}: {
  certificate: Certificate;
  /** Issuer line for courses without a known platform. */
  issuerFallback: string;
  verifyLabel: string;
}) {
  const { title, href, preview } = certificate;
  const issuer = certificate.issuer && getTech(certificate.issuer);
  const site = (
    <LinkPreviewSite icon={issuer && <BrandIcon name={issuer.name} mark={issuer.mark} size="sm" />}>
      {issuer?.name ?? issuerFallback}
    </LinkPreviewSite>
  );

  return (
    <Dialog>
      <DialogTrigger
        render={<Card variant="interactive" render={<button type="button" />} />}
        className="size-full"
      >
        <CertificateMedia certificate={certificate} />
        <LinkPreviewBody>
          {site}
          <LinkPreviewTitle>{title}</LinkPreviewTitle>
        </LinkPreviewBody>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          {/* pr-10 keeps the title clear of the close button */}
          <div className="pr-10">
            <DialogHeader>
              {site}
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
          </div>
          <CertificateMedia certificate={certificate} variant="framed" />
          {preview?.description && <DialogDescription>{preview.description}</DialogDescription>}
          {href && (
            <DialogFooter>
              <ButtonLink href={href} target="_blank" rel="noopener" size="sm">
                {verifyLabel} <ArrowUpRightIcon aria-hidden />
              </ButtonLink>
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

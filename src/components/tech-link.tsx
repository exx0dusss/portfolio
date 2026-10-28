import { cva, type VariantProps } from "class-variance-authority";

import { BrandIcon } from "@/components/ui/brand-icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  LinkPreview,
  LinkPreviewBody,
  LinkPreviewDescription,
  LinkPreviewFooter,
  LinkPreviewMedia,
  LinkPreviewSite,
  LinkPreviewTitle,
} from "@/components/ui/link-preview";
import { getTech, type TechId } from "@/lib/tech";
import { cn } from "@/lib/utils/cn";

const techLinkVariants = cva("", {
  variants: {
    variant: {
      /** Bright, underlined word inside prose. */
      inline: "tech-link",
      /** Logo + name pill, for stack lists. */
      chip: "tech-chip",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

/**
 * A link to a technology's site that previews it on hover or focus, composed
 * from HoverCard + LinkPreview + BrandIcon. Data comes from the tech registry
 * (src/lib/tech.ts); clicking opens the site in a new tab, and touch devices
 * follow the link directly.
 *
 *   <TechLink id="nestjs" />                    → "NestJS"
 *   <TechLink id="spring">Java Spring</TechLink> → custom text, same tech
 *   <TechLink id="docker" variant="chip" />     → logo chip
 */
function TechLink({
  id,
  variant,
  className,
  children,
}: VariantProps<typeof techLinkVariants> & {
  id: TechId;
  className?: string;
  children?: React.ReactNode;
}) {
  const tech = getTech(id);
  const { preview } = tech;
  const logo = (size: "sm" | "lg") => <BrandIcon name={tech.name} path={tech.iconPath} size={size} />;

  return (
    <HoverCard>
      <HoverCardTrigger
        href={tech.href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="tech-link"
        className={cn(techLinkVariants({ variant }), className)}
      >
        {variant === "chip" && logo("sm")}
        {children ?? tech.name}
      </HoverCardTrigger>
      <HoverCardContent>
        <LinkPreview>
          <LinkPreviewMedia src={preview.image}>{logo("lg")}</LinkPreviewMedia>
          <LinkPreviewBody>
            <LinkPreviewSite icon={logo("sm")}>{preview.site}</LinkPreviewSite>
            <LinkPreviewTitle>{preview.title ?? tech.name}</LinkPreviewTitle>
            {preview.description && (
              <LinkPreviewDescription>{preview.description}</LinkPreviewDescription>
            )}
            <LinkPreviewFooter />
          </LinkPreviewBody>
        </LinkPreview>
      </HoverCardContent>
    </HoverCard>
  );
}

export { TechLink, techLinkVariants };

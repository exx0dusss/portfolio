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

const techLinkVariants = cva("", {
  variants: {
    variant: {
      /** Bright, underlined word inside prose. */
      inline:
        "font-medium text-fg underline decoration-line-strong decoration-1 underline-offset-3 transition-colors duration-150 ease-pop hover:decoration-fg focus-visible:decoration-fg",
      /** Logo + name pill, for stack lists; tighter on phones. */
      chip: "group/brand inline-flex items-center gap-2 rounded-10 border border-line bg-card py-1.25 pr-2.75 pl-1.25 text-13.5 text-fg transition-colors duration-150 ease-pop hover:border-line-strong focus-visible:border-line-strong max-phone:gap-1.75 max-phone:py-1 max-phone:pr-2.25 max-phone:pl-1 max-phone:text-13",
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
  children,
}: VariantProps<typeof techLinkVariants> & {
  id: TechId;
  children?: React.ReactNode;
}) {
  const tech = getTech(id);
  const { preview } = tech;
  const logo = (size: "sm" | "lg") => <BrandIcon name={tech.name} mark={tech.mark} size={size} />;

  return (
    <HoverCard>
      <HoverCardTrigger
        href={tech.href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="tech-link"
        data-variant={variant ?? "inline"}
        // the classes are TechLink's own variants above; the rule only reads inline cva() calls
        // eslint-disable-next-line shadcn/require-static-classes
        className={techLinkVariants({ variant })}
      >
        {/* the chip's logo shows its own colours while the chip is hovered */}
        {variant === "chip" && (
          <BrandIcon name={tech.name} mark={tech.mark} logo={tech.logo} size="sm" />
        )}
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

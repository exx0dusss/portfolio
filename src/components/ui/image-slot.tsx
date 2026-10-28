import { ImageIcon } from "@/components/ui/icons";

import { cn } from "@/lib/utils/cn";

type Shape = "rect" | "rounded" | "circle" | "pill";
type Fit = "cover" | "contain" | "fill";

interface ImageSlotProps {
  /** Image source. When omitted the slot renders its labelled empty state. */
  src?: string;
  alt?: string;
  shape?: Shape;
  /** Corner radius (px) for shape="rounded". */
  radius?: number;
  fit?: Fit;
  /** Native lazy loading for below-the-fold images. */
  loading?: "lazy" | "eager";
  /** Empty-state caption. */
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Drop-in replacement for the design prototype's <image-slot> web component.
 * The prototype let users drag images onto persistent slots via a design-tool
 * runtime that doesn't exist in production — here a slot simply renders a real
 * image when given a `src`, or a clean labelled placeholder when empty. Drop
 * assets into /public and pass their path as `src`.
 */
export function ImageSlot({
  src,
  alt = "",
  shape = "rounded",
  radius = 12,
  fit = "cover",
  loading,
  placeholder = "Image",
  className,
  style,
}: ImageSlotProps) {
  const borderRadius =
    shape === "circle"
      ? "50%"
      : shape === "pill"
        ? "9999px"
        : shape === "rounded"
          ? `${radius}px`
          : undefined;

  return (
    <div
      data-slot="image-slot"
      className={cn("relative block min-h-22.5 overflow-hidden bg-card-2", className)}
      style={{ borderRadius, ...style }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary aspect ratios; sized by the slot box, not next/image
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          style={{ objectFit: fit }}
          data-slot="image-slot-image"
          className="block size-full"
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-1.5 border-dashed border-line-strong p-3.5 text-center text-fg-faint [&_svg]:opacity-50"
          style={{ borderRadius }}
        >
          <ImageIcon size={26} aria-hidden />
          <span className="max-w-9/10 text-12 leading-label font-medium">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

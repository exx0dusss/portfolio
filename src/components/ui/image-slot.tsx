import Image from "next/image";
import { ImageIcon } from "lucide-react";

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
      className={cn("img-slot", className)}
      style={{ borderRadius, ...style }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          style={{ objectFit: fit }}
          className="img-slot-img"
        />
      ) : (
        <div className="img-slot-ph" style={{ borderRadius }}>
          <ImageIcon size={26} strokeWidth={1.6} aria-hidden />
          <span className="img-slot-cap">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

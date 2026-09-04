import { Reveal } from "@/components/motion/reveal";
import { ImageSlot } from "@/components/ui/image-slot";

import type { GalleryItem } from "./projects-detail";

/** Screenshot gallery — a wide 16:9 lead tile plus 4:3 tiles. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <Reveal className="gal">
      {items.map((item) => (
        <div className={`g${item.wide ? " wide" : ""}`} key={item.placeholder}>
          <ImageSlot
            src={item.src}
            alt={item.alt ?? ""}
            shape="rect"
            placeholder={item.placeholder}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: item.wide ? "16/9" : "4/3",
            }}
          />
        </div>
      ))}
    </Reveal>
  );
}

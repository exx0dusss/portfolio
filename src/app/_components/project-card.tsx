import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils/cn";

import type { Project } from "./projects";

/** One project row in the Work section: thumbnail + doodle stickers on the
 *  left, copy + tags + link on the right. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="proj">
      <div className="thumb-wrap">
        <div className="thumb">
          <ImageSlot
            src={project.cover}
            alt={`${project.title} project preview`}
            shape="rect"
            className="shot"
            style={{ height: "auto", aspectRatio: "16 / 10" }}
            placeholder="Screenshot"
          />
        </div>
        <span className="proj-ico" style={project.iconStyle}>
          {project.icon}
        </span>
        {project.stickers.map((sticker, i) => (
          <span
            key={i}
            className={cn("sticker", sticker.kind, sticker.tone)}
            style={sticker.style}
          >
            {sticker.text}
          </span>
        ))}
      </div>
      <div className="ptext">
        <div className="proj-num">
          <span className="num">{project.num}</span>
        </div>
        <div className="proj-title">
          {project.title} <span className="yr">{project.year}</span>
        </div>
        <div className="proj-kind">{project.kind}</div>
        <p className="proj-desc">{project.description}</p>
        <div className="proj-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="ptag">
              {tag}
            </span>
          ))}
        </div>
        <Link className="proj-link" href={project.href}>
          Read more <span className="a">→</span>
        </Link>
      </div>
    </Reveal>
  );
}

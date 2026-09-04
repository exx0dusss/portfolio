import { Reveal } from "@/components/motion/reveal";

/** Confidentiality notice used in place of a gallery for NDA / private work. */
export function LockedNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="locked-wrap">
      <Reveal className="locked">
        <span className="li">🔒</span>
        <div>
          <div className="lt">{title}</div>
          <div className="ld">{children}</div>
        </div>
      </Reveal>
    </div>
  );
}

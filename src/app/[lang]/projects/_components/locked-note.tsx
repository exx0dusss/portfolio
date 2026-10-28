import { Reveal } from "@/components/motion/reveal";

/** Confidentiality notice used in place of a gallery for NDA / private work. */
export function LockedNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <Reveal className="flex items-start gap-3.5 rounded-13 border border-dashed border-line-strong bg-card-2 px-6 py-5.5">
        <span className="flex-none text-20">🔒</span>
        <div>
          <div className="text-14 font-medium text-fg">{title}</div>
          <div className="mt-1 text-13 leading-copy text-fg-dim">{children}</div>
        </div>
      </Reveal>
    </div>
  );
}

import { Reveal } from "@/components/motion/reveal";
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@/components/ui/code-block";

import type { AnatomyCard } from "./projects-detail";

/** Component names in an anatomy, as `<Name` or `</Name`. */
const TAG = /(<\/?)([A-Z][A-Za-z]*)/g;

/** One line of an anatomy, with the component names in the accent. */
function AnatomyLine({ line }: { line: string }) {
  const parts = line.split(TAG);
  // split() with two groups yields [text, bracket, name, text, bracket, name, …]
  return (
    <CodeBlockLine>
      {parts.map((part, i) =>
        i % 3 === 2 ? (
          <span key={i} className="text-accent-ink">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </CodeBlockLine>
  );
}

/** Components shown the way shadcn documents them: what each one is for,
 *  then its anatomy, the parts it is composed of, as code. */
export function ComponentAnatomy({ components }: { components: AnatomyCard[] }) {
  return (
    <Reveal className="grid gap-3.5">
      {components.map((component) => (
        <div
          className="grid grid-cols-2 items-start gap-6 rounded-card border border-line px-5 py-4.5 max-phone:grid-cols-1 max-phone:gap-4"
          key={component.title}
        >
          <div>
            <div className="font-mono text-12 text-accent-ink">{component.fn}</div>
            <div className="mt-2.5 text-14.5 font-medium text-fg">{component.title}</div>
            <div className="mt-2 text-13 leading-copy text-fg-dim">{component.description}</div>
          </div>
          <CodeBlock size="sm">
            <CodeBlockContent>
              {component.anatomy.split("\n").map((line, i) => (
                <AnatomyLine key={i} line={line} />
              ))}
            </CodeBlockContent>
          </CodeBlock>
        </div>
      ))}
    </Reveal>
  );
}

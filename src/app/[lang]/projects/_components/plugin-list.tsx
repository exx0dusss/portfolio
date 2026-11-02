import { Reveal } from "@/components/motion/reveal";

import type { PluginItem } from "./projects-detail";

/** Packages and what each brings: the name in mono on one line, never broken
 *  at its hyphens, with the description beside it; on a phone, below it. */
export function PluginList({ plugins }: { plugins: PluginItem[] }) {
  return (
    <Reveal className="rounded-card border border-line">
      <ul data-slot="plugin-list" className="m-0 list-none p-0">
        {plugins.map((plugin) => (
          <li
            key={plugin.name}
            className="flex items-baseline gap-6 border-b border-line px-4 py-3 last:border-b-0 max-phone:block"
          >
            <code className="w-44 flex-none font-mono text-12.5 whitespace-nowrap text-fg">
              {plugin.name}
            </code>
            <span className="text-13 leading-copy text-fg-dim max-phone:mt-1 max-phone:block">
              {plugin.description}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, validators } from "tailwind-merge";

/** tailwind-merge taught the site's own tokens (globals.css @theme): font
 *  sizes are named by pixels (`text-13`) or purpose (`text-hero`), which it
 *  would otherwise read as a text color and drop `text-fg` beside it; widths
 *  are named by purpose (`w-dialog`, `w-live-preview`), which it would
 *  otherwise not see as widths and keep both. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [validators.isNumber, "hero", "title", "mail"],
      container: [(value: string) => /^[a-z][a-z-]*$/.test(value)],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, validators } from "tailwind-merge";

/** tailwind-merge taught the site's own tokens (globals.css @theme): font
 *  sizes are named by pixels (`text-13`), which it would otherwise read as
 *  a text color and drop `text-fg` beside it. The fluid display sizes
 *  (`text-hero`, `text-title`, `text-mail`) are font sizes too. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [validators.isNumber, "hero", "title", "mail"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

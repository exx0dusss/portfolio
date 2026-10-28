import { plugin as shadcn } from "@shadcn/lint";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // @shadcn/lint: design-system rules (docs/ui-patterns.md#lint). Pages may
  // add layout classes to components but not restyle them, and classes must
  // be readable static strings without arbitrary values.
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { shadcn },
  },
  {
    // the whole site is Tailwind on the site's own tokens: a class that
    // generates no CSS is a typo or a missing token
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/require-static-classes": "error",
      "shadcn/no-unknown-classes": "error",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // agent worktrees and local Claude settings
    ".claude/**",
  ]),
]);

export default eslintConfig;

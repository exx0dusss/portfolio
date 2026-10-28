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
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/require-static-classes": "error",
    },
  },
  {
    // components style themselves and call their own variant functions
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  // sorts classes against the site's own tokens, not Tailwind's default theme
  tailwindStylesheet: "./src/styles/globals.css",
  // class strings inside these calls are sorted too
  tailwindFunctions: ["cn", "cva"],
};

export default config;

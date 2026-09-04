import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "pg0p8z5s",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
});

import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "th12ty",
  chromeWebSecurity: false,
  e2e: {
    supportFile: false,
  },
});

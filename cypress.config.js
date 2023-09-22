import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "xxxxx",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://localhost:4321",
    supportFile: false,
  },
});

import { test, expect } from "vitest";
import * as config from "./config.js";

test("languages object", () => {
  expect(typeof config.languages).toBe("object");
  expect(config.languages).toHaveProperty("en", "English");
  expect(config.languages).toHaveProperty("zh-cn", "中文（简体）");
});

test("defaultLang", () => {
  expect(config.defaultLang).toBe("en");
});

test("ui object", () => {
  expect(typeof config.ui).toBe("object");
  expect(config.ui).toHaveProperty("en");
  expect(config.ui).toHaveProperty("zh-cn");

  // Add additional checks to ensure the flattenObject function has done its job
  expect(config.ui["en"]).toHaveProperty("home.title"); // Replace with actual keys
  expect(config.ui["zh-cn"]).toHaveProperty("home.title"); // Replace with actual keys
});

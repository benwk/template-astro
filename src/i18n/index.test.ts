// src/i18n/index.test.ts
import { test, expect } from "vitest";
import {
  getLangFromUrl,
  useTranslations,
  useTranslatedPath,
  removeLangPrefix,
  generateAlternateLink,
  interpolate,
} from "./index.js";
import { ui, defaultLang, showDefaultLang } from "./config.js";

// Mock URL and ui object for testing
globalThis.URL = class {
  constructor(path) {
    this.pathname = path;
  }
};

// Test for getLangFromUrl
test("getLangFromUrl", () => {
  expect(getLangFromUrl(new URL("/somepath"))).toBe("en");
  expect(getLangFromUrl(new URL("/zh-cn/somepath"))).toBe("zh-cn");
  expect(getLangFromUrl(new URL("/fr/somepath"))).toBe(defaultLang);
});

// Test for useTranslations
test("useTranslations", () => {
  const t = useTranslations("en");
  expect(t("someKey")).toBe(ui["en"]["someKey"]);
});

// Test for useTranslatedPath
test("useTranslatedPath", () => {
  const translatePath = useTranslatedPath("zh-cn");
  expect(translatePath("/somepath")).toBe("/zh-cn/somepath");
});

// Test for removeLangPrefix
test("removeLangPrefix", () => {
  expect(removeLangPrefix("/en/somepath", "en")).toBe("/somepath");
  expect(removeLangPrefix("/somepath", "en")).toBe("/somepath");
});

// Test for generateAlternateLink
test("generateAlternateLink", () => {
  expect(
    generateAlternateLink("/somepath", "zh-cn", "http://example.com")
  ).toBe("http://example.com/zh-cn/somepath");
});

// Test for interpolate
test("interpolate", () => {
  const i18n = "vitest.translation";
  const referenceString = "<span>A</span>B<span>C</span>";
  const lang = "en";

  // Mock the useTranslations function to return a known string
  const t = useTranslations(lang);
  const localisedString = t(i18n);
  const result = interpolate(localisedString, referenceString);

  expect(result).toBe(
    "<span>TranslatedA</span>TranslatedB<span>TranslatedC</span>"
  );
});

// Test for missing HTML tags in reference string
test("interpolate: No HTML tags in reference string", () => {
  const localizedString = "Some translated string";
  const referenceString = "Some reference string";

  // Execute the function
  const result = interpolate(localizedString, referenceString);

  // We expect the localized string to be returned as is,
  // because there are no HTML tags to interpolate
  expect(result).toBe(localizedString);
});

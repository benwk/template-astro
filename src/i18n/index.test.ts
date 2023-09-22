// src/i18n/index.test.ts
import { test, expect } from "vitest";
import {
  getLangFromUrl,
  useTranslations,
  useTranslatedPath,
  removeLangPrefix,
  interpolate,
} from "./index.js";
import { ui, defaultLang } from "./config.js";

// Test for getLangFromUrl
test("getLangFromUrl", () => {
  expect(getLangFromUrl(new URL("http://localhost:4321/somepath"))).toBe("en");
  expect(getLangFromUrl(new URL("http://localhost:4321/zh-cn/somepath"))).toBe(
    "zh-cn"
  );
  expect(getLangFromUrl(new URL("http://localhost:4321/fr/somepath"))).toBe(
    defaultLang
  );
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

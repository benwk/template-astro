import en from "./locales/en.json" assert { type: "json" };
import zhCN from "./locales/zh-cn.json" assert { type: "json" };
import { flattenObject } from "./utils/json.js";

export const languages = {
  en: "English",
  "zh-cn": "中文（简体）",
};

export const defaultLang = "en";

export const ui = {
  en: flattenObject(en),
  "zh-cn": flattenObject(zhCN),
};

export const showDefaultLang = false;

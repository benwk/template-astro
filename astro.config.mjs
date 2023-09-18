import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  site: "https://astro.benwk.app",
  integrations: [
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date("2023-09-12"),
      // serialize(item) {
      //   if (/exclude-from-sitemap/.test(item.url)) {
      //     return undefined;
      //   }
      //   if (/your-special-page/.test(item.url)) {
      //     item.changefreq = "daily";
      //     item.lastmod = new Date();
      //     item.priority = 0.9;
      //   }
      //   return item;
      // },
      // i18n: {
      //   defaultLocale: "en",
      //   locales: {
      //     en: "en-US",
      //     "zh-cn": "zh-CN",
      //   },
      // },
    }),
    robotsTxt({
      host: "astro.benwk.app",
      policy: [
        {
          userAgent: "Googlebot",
          allow: "/",
          disallow: ["/search", "/api"],
          crawlDelay: 2,
        },
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/search", "/admin", "/login", "/api"],
          crawlDelay: 10,
          cleanParam: "ref /articles/",
        },
      ],
    }),
    partytown({
      config: {
        debug: false,
        forward: ["dataLayer.push"],
      },
    }),
    prefetch({
      throttle: 3,
    }),
    compress({
      Logger: 0,
    }),
    webmanifest({
      name: "Ben's Astro Template",
      icon: "src/icons/manifest.svg",
      short_name: "Ben Z.",
      description:
        "Programming is my language, cmd + c and cmd + v are my lifeblood.",
      theme_color: "#0246BC",
      background_color: "#13151a",
      display: "standalone",
      lang: "en-US",
      start_url: "/",
      locales: {
        "zh-cn": {
          name: "Ben's Astro 模板",
          short_name: "Ben Z.",
          description: "编程才是我的母语，cmd + c 和 cmd + v 是我的命脉。",
          lang: "zh-CN",
          start_url: "/zh-cn",
        },
      },
    }),
  ],
});

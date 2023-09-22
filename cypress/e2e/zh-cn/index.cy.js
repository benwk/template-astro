import "../seo";
// ENV
const clientId = Cypress.env("CF_ACCESS_CLIENT_ID");
const clientSecret = Cypress.env("CF_ACCESS_CLIENT_SECRET");
const testURL = Cypress.env("TEST_URL");
// SEO
const title = "Ben's Coding：编程才是我的母语。";
const description = "编程才是我的母语，cmd + c 和 cmd + v 是我的命脉。";
const keywords = "ben, benwk, coding, 博客, astro, 模板";
const author = "Ben Z.";
const image = "ben-social-preview-dark-zh-cn.png";
const imageAlt = "Ben Z.";

describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.intercept("https://discord.com/*", {});
    // cy.intercept("https://*.sentry.io/*", {});
    cy.visit("/zh-cn/", {
      headers: {
        "CF-Access-Client-Id": clientId,
        "CF-Access-Client-Secret": clientSecret,
      },
    });
  });

  it("Page title is correct", () => {
    cy.get("title").should("have.text", title);
    // cy.get("h1").should("have.text", "DΞLΛY");
  });

  it("SEO headers are correct", () => {
    cy.checkMetaTags({
      "og:title": title,
      "og:description": description,
      "og:image": `${testURL}/${image}`,
      "og:url": `${testURL}/zh-cn/`,
      "og:type": "website",
      "twitter:card": "summary_large_image",
      "twitter:site": "@benwkz",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": `${testURL}/${image}`,
      "twitter:image:alt": imageAlt,
      description: description,
      keywords: keywords,
      author: author,
    });
  });
});

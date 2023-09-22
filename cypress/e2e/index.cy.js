import "./seo";
// ENV
const clientId = Cypress.env("CF_ACCESS_CLIENT_ID");
const clientSecret = Cypress.env("CF_ACCESS_CLIENT_SECRET");
const testURL = Cypress.env("TEST_URL");
// SEO
const title = "Ben's Coding: Programming is my language.";
const description =
  "Programming is my language, cmd + c and cmd + v are my lifeblood.";
const keywords = "ben, benwk, coding, blog, astro, template";
const author = "Ben Z.";
const image = "ben-social-preview-dark.png";
const imageAlt = "Ben Z.";

describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.intercept("https://discord.com/*", {});
    // cy.intercept("https://*.sentry.io/*", {});
    cy.visit("/", {
      headers: {
        "CF-Access-Client-Id": clientId,
        "CF-Access-Client-Secret": clientSecret,
      },
    });
  });

  it("Page title is correct", () => {
    cy.get("title").should("have.text", title);
  });

  it("SEO headers are correct", () => {
    cy.checkMetaTags({
      "og:title": title,
      "og:description": description,
      "og:image": `${testURL}/${image}`,
      "og:url": `${testURL}/`,
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

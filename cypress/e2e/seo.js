Cypress.Commands.add("checkMetaTags", (tags) => {
  Object.keys(tags).forEach((tag) => {
    const selector = tag.startsWith("og:")
      ? `meta[property="${tag}"]`
      : `meta[name="${tag}"]`;
    cy.get(selector).should("have.attr", "content", tags[tag]);
  });
});

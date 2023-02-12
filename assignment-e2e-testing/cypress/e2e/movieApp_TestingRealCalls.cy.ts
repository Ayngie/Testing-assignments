describe("movieApp - real calls to OMDb API", () => {
  it("should get and display search results in html", () => {
    cy.visit("http://localhost:1234/"); //ladda om sidan, för att nollställa den.
    cy.get("input").type("Star Wars");
    cy.get("button").click();
    cy.get("#movie-container:has(h3)").should("contain", "Star Wars");
  });

  it("should display first 10 search results in html", () => {
    cy.get("#movie-container>div").should("have.length", 10);
    cy.get("h3").should("have.length", 10);
    cy.get("img").should("have.length", 10);
  });

  it("should display search result images in html", () => {
    cy.get("#movie-container>div")
      .find("img")
      .should("have.attr", "alt")
      .should("include", "Star Wars");

    cy.get("#movie-container>div")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
      );
  });
});

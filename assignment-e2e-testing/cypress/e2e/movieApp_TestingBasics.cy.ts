describe("basic functions of application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/"); //ladda om sidan
  });

  it("should get the indexpage's title", () => {
    cy.title().should("include", "Async testing");
  });

  it("should find input and button", () => {
    cy.get("input").should("have.id", "searchText");
    cy.get("button").should("contain", "Sök");
  });

  it("should type text", () => {
    cy.get("input").type("Star Wars");
    cy.get("input").should("have.value", "Star Wars");
  });

  it("should get error message if no userInput", () => {
    // cy.get("input").clear(); //Rensa input //Behövs inte när vi laddar om sidan före varje test.
    cy.get("button").click();
    cy.get("input").should("have.value", "");
    cy.get("p").should("contain", "Inga sökresultat att visa");
  });

  it("should get error message if input is >3 characters", () => {
    // cy.get("input").clear(); //Rensa input //Behövs inte när vi laddar om sidan före varje test.
    cy.get("input").type("St");
    cy.get("button").click();
    cy.get("input").should("have.value", "St");
    cy.get("p").should("contain", "Inga sökresultat att visa");
  });
});

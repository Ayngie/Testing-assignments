import { IOmdbResponse } from "../../src/ts/models/IOmdbResponse";
import { mockData } from "../mocks/movieMocks";

const emptyMockData: IOmdbResponse = { Search: [] };

describe("movieApp - MOCK calls to API", () => {
  it("should get mockData", () => {
    cy.visit("http://localhost:1234/"); //ladda sidan
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("mockMovieList");

    cy.get("input").type("Star Wars");
    cy.get("input").should("have.value", "Star Wars");
    cy.get("button").click();

    cy.wait("@mockMovieList").its("request.url").should("contain", "Star");
  });

  it("should get two results (mockData)", () => {
    cy.get("#movie-container>div").should("have.length", 2);
    cy.get("h3").should("have.length", 2);
    cy.get("img").should("have.length", 2);

    cy.get("#movie-container").find("div").first().as("firstMovie"); //alias
    cy.get("#movie-container").find("div").next().as("secondMovie"); //alias

    cy.get("@firstMovie").should("contain", "Star");
    cy.get("@secondMovie").should("contain", "Star");
  });

  it("should display h3:s in html", () => {
    cy.get("#movie-container").find("div").first().as("firstMovie"); //alias
    cy.get("#movie-container").find("div").next().as("secondMovie"); //alias

    cy.get("@firstMovie") /* Vårt alias för #movie-container>div:first-child */
      .find("h3")
      .should("contain", "Star Wars: Episode IV - A New Hope (Mock)");
    cy.get("@secondMovie") /* Vårt alias för #movie-container>div:last-child */
      .find("h3")
      .should(
        "contain",
        "Star Wars: Episode V - The Empire Strikes Back (Mock)"
      );
  });

  it("should display img:s in html", () => {
    cy.get("#movie-container").find("div").first().as("firstMovie"); //alias
    cy.get("#movie-container").find("div").next().as("secondMovie"); //alias

    cy.get("@firstMovie") /* Vårt alias för #movie-container>div:first-child */
      .find("img")
      .should("have.attr", "alt", "Star Wars: Episode IV - A New Hope (Mock)")
      .and(
        "have.attr",
        "src",
        "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
      );

    cy.get("@secondMovie") /* Vårt alias för #movie-container>div:last-child */
      .find("img")
      .should(
        "have.attr",
        "alt",
        "Star Wars: Episode V - The Empire Strikes Back (Mock)"
      )
      .and(
        "have.attr",
        "src",
        "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
      );
  });

  it("should get error message if no result from search", () => {
    cy.visit("http://localhost:1234/"); //ladda om sidan
    cy.intercept("GET", "http://omdbapi.com/*", emptyMockData).as(
      "emptyMockMovieList"
    );

    cy.get("input").type("kdossd");
    cy.get("input").should("have.value", "kdossd");
    cy.get("button").click();

    cy.wait("@emptyMockMovieList").its("request.url").should("contain", "");

    cy.get("p").should("contain", "Inga sökresultat att visa");
  });
});

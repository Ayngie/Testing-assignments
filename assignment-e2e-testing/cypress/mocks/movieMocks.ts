import { IOmdbResponse } from "../../src/ts/models/IOmdbResponse";

export const mockData: IOmdbResponse = {
  Search: [
    //egenskap för vår IOmdbResponse (om man kollar i interfacet).
    {
      Title: "Star Wars: Episode IV - A New Hope (Mock)",
      imdbID: "tt0076759",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
      Year: "1977",
    },
    {
      Title: "Star Wars: Episode V - The Empire Strikes Back (Mock)",
      imdbID: "tt0080684",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      Year: "1980",
    },
  ],
};

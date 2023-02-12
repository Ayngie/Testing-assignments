/**
 * @jest-environment jsdom
 */

import { movieSort } from "../functions";
import { IMovie } from "../models/Movie";
import { test, expect, describe, jest } from "@jest/globals";

describe(movieSort, () => {
  afterEach(jest.clearAllMocks);

  test("should sort movies in alphabetical order (descending)", () => {
    //test av if-sats
    // Arrange
    // Behövs inte, pga finns klart o importeras (mockData).
    let movies: IMovie[] = [
      { Title: "Aaa", imdbID: "Aaa", Type: "Aaa", Poster: "Aaa", Year: "Aaa" },
      { Title: "Ddd", imdbID: "Ddd", Type: "Ddd", Poster: "Ddd", Year: "Aaa" },
      { Title: "Ccc", imdbID: "Ccc", Type: "Ccc", Poster: "Ccc", Year: "Ccc" },
      { Title: "Ddd", imdbID: "Ddd", Type: "Ddd", Poster: "Ddd", Year: "Aaa" },
    ];
    // Act
    movieSort(movies);

    // Assert
    expect(movies[0].Title).toBe("Aaa");
  });

  test("should sort movies in alphabetical order (ascending)", () => {
    //test av else-sats
    // Arrange
    // Behövs inte, pga finns klart o importeras (mockData).
    let movies: IMovie[] = [
      { Title: "Ccc", imdbID: "Ccc", Type: "Ccc", Poster: "Ccc", Year: "Ccc" },
      { Title: "Aaa", imdbID: "Aaa", Type: "Aaa", Poster: "Aaa", Year: "Aaa" },
      { Title: "Ddd", imdbID: "Ddd", Type: "Ddd", Poster: "Ddd", Year: "Aaa" },
      { Title: "Ddd", imdbID: "Ddd", Type: "Ddd", Poster: "Ddd", Year: "Aaa" },
    ];
    // Act
    movieSort(movies, false);

    // Assert
    expect(movies[0].Title).toBe("Ddd");
  });
});

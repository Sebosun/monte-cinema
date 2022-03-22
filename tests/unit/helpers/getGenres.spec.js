import getGenres from "../../../src/helpers/getGenres.js";
import getGenresMoviesArray from "./getGenresMoviesArray";
import { toIncludeSameMembers } from "jest-extended";
expect.extend({ toIncludeSameMembers });

describe("returns correct genres if data is non faulty", () => {
  test("If filters duplicates", () => {
    const moviesGenresMock = [
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 5, name: "Predator" } },
      { genre: { id: 3, name: "Fantasy" } },
    ];

    const expectedValue = [
      { id: 3, name: "Fantasy" },
      { id: 5, name: "Predator" },
    ];

    expect(getGenres(moviesGenresMock)).toIncludeSameMembers(expectedValue);
  });

  test("If filters duplicates 2", () => {
    const moviesGenresMock = [
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 5, name: "Predator" } },
      { genre: { id: 6, name: "Auroto" } },
      { genre: { id: 5, name: "Predator" } },
      { genre: { id: 8, name: "Naruto" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
      { genre: { id: 3, name: "Fantasy" } },
    ];

    const expectedValue = [
      { id: 8, name: "Naruto" },
      { id: 3, name: "Fantasy" },
      { id: 6, name: "Auroto" },
      { id: 5, name: "Predator" },
    ];

    expect(getGenres(moviesGenresMock)).toIncludeSameMembers(expectedValue);
  });

  test("If there's only one genre", () => {
    const moviesGenresMock = [{ genre: { id: 3, name: "Fantasy" } }];

    const expectedValue = [{ id: 3, name: "Fantasy" }];

    expect(getGenres(moviesGenresMock)).toIncludeSameMembers(expectedValue);
  });

  test("If movies array is empty", () => {
    const moviesGenresMock = [];
    const expectedValue = [];

    expect(getGenres(moviesGenresMock)).toIncludeSameMembers(expectedValue);
  });

  test("If works on real data", () => {
    const expectedValue = [
      { id: 2, name: "Comedy" },
      { id: 3, name: "Fantasy" },
      { id: 4, name: "Sci-Fi" },
      { id: 5, name: "Romance" },
      { id: 6, name: "Family" },
      { id: 9, name: "Action" },
    ];
    expect(getGenres(getGenresMoviesArray)).toIncludeSameMembers(expectedValue);
  });
});

import { defaultClient } from "./axiosClient";

//TODO
export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id) => defaultClient.get(`/movies/${id}`);

export const getSeancesByMovieId = async (id) =>
  defaultClient.get(`/seances?movie_id=${id}`);

// expects a date object
export const getSeancesByDate = async (date) => {
  // var year = date.getUTCFullYear();
  // var month = `0${date.getUTCMonth() + 1}`.slice(-2);
  // var day = `0${date.getDate()}`.slice(-2);
  // var apiDateFormat = `${year}-${month}-${day}`; // yyyy-mm-dd
  const dateIntl = new Intl.DateTimeFormat("pl-PL").format(date);
  const apiDateFormat = dateIntl.replace("/", "-");
  const response = await defaultClient.get(`/seances?date=${apiDateFormat}`);
  return response;
};

export const getUser = async () => defaultClient.get("/user");

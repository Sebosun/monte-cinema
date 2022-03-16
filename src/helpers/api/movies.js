import { defaultClient } from "./axiosClient";

export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id) => defaultClient.get(`/movies/${id}`);

export const getSeancesByMovieId = async (id) =>
  defaultClient.get(`/seances?movie_id=${id}`);

// expects a date object
export const getSeancesByDate = async (date) => {
  const dateFormatted = formatDateForFetch(date);
  const response = await defaultClient.get(`/seances?date=${dateFormatted}`);
  return response;
};

export const getSeancesByDateID = async (date, id) => {
  const dateFormatted = formatDateForFetch(date);

  const response = await defaultClient.get(
    `/seances?movie_id=${id}&date=${dateFormatted}`
  );
  return response;
};

function formatDateForFetch(date) {
  const dateIntl = new Intl.DateTimeFormat("pl-PL").format(date);
  const apiDateFormat = dateIntl.replace("/", "-");
  return apiDateFormat;
}

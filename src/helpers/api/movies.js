import { defaultClient } from "./axiosClient";

export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id) => defaultClient.get(`/movies/${id}`);

export const getSeances = async ({ date, id }) => {
  if (date && id) {
    const dateFormatted = formatDateForFetch(date);
    return await defaultClient.get(
      `/seances?movie_id=${id}&date=${dateFormatted}`
    );
  } else if (date) {
    const dateFormatted = formatDateForFetch(date);
    return await defaultClient.get(`/seances?date=${dateFormatted}`);
  } else if (id) {
    return await defaultClient.get(`/seances?movie_id=${id}`);
  } else {
    return await defaultClient.get("/seances");
  }
};

function formatDateForFetch(date) {
  const dateIntl = new Intl.DateTimeFormat("pl-PL").format(date);
  const apiDateFormat = dateIntl.replace("/", "-");
  return apiDateFormat;
}

import { defaultClient } from "./axiosClient";

export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id) => defaultClient.get(`/movies/${id}`);

export const showSeances = async (id) => defaultClient.get(`/seances/${id}`);

export const getHall = async (id) => defaultClient.get(`/halls/${id}`);

export const getSeances = async ({ date, id }) => {
  return await defaultClient.get("/seances", {
    params: {
      movie_id: id && id,
      date: date && formatDateForFetch(date),
    },
  });
};

function formatDateForFetch(date) {
  const dateIntl = new Intl.DateTimeFormat("pl-PL").format(date);
  const apiDateFormat = dateIntl.replace("/", "-");
  return apiDateFormat;
}

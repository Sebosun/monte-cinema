import { defaultClient } from "./axiosClient";

interface Seances {
  date?: Date;
  id?: number;
}

export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id: number) =>
  defaultClient.get(`/movies/${id}`);

export const getSeances = async ({ date, id }: Seances) => {
  return await defaultClient.get("/seances", {
    params: {
      movie_id: id && id,
      date: date && formatDateForFetch(date),
    },
  });
};

function formatDateForFetch(date: Date) {
  const dateIntl = new Intl.DateTimeFormat("pl-PL").format(date);
  const apiDateFormat = dateIntl.replace("/", "-");
  return apiDateFormat;
}

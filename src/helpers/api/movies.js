import { defaultClient } from "./axiosClient";

//TODO
export const getAllMovies = async () => defaultClient.get("/movies");

export const getOneMovie = async (id) => defaultClient.get(`/movies/${id}`);

export const getUser = async () => defaultClient.get("/user");

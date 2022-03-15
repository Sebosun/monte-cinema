import * as moviesApi from "@/helpers/api/movies";

const movies = {
  namespaced: true,
  state: {
    movies: [],
    loading: true,
    error: { status: false, message: "" },
  },
  getters: {
    allMovies: (state) => state.movies,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setError(state, payload) {
      state.error = { status: payload.status, message: payload.message };
    },
    setMovies(state, payload) {
      state.movies = payload;
    },
  },
  actions: {
    async getMovies({ commit }) {
      try {
        const movies = await moviesApi.getAllMovies();
        commit("setMovies", movies.data);
      } catch {
        commit("setError", {
          status: true,
          message: "Request failed. Please try again later.",
        });
      } finally {
        commit("toggleLoading");
      }
    },
  },
};

export default movies;

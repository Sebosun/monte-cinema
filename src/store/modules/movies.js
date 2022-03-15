import * as moviesApi from "@/helpers/api/movies";

const movies = {
  namespaced: true,
  state: {
    movies: [],
    seances: [],
    loading: true,
    error: { status: false, message: "" },
  },
  getters: {
    allMovies: (state) => state.movies,
    loading: (state) => state.loading,
    error: (state) => state.error,
    seances: (state) => state.seances,
  },
  mutations: {
    toggleLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = { status: payload.status, message: payload.message };
    },
    setMovies(state, payload) {
      state.movies = payload;
    },
    setSeances(state, payload) {
      state.seances = payload;
    },
  },
  actions: {
    async getMovies({ commit }) {
      try {
        commit("toggleLoading", true);
        const movies = await moviesApi.getAllMovies();
        commit("setMovies", movies.data);
      } catch {
        commit("setError", {
          status: true,
          message: "Request failed. Please try again later.",
        });
      } finally {
        commit("toggleLoading", false);
      }
    },
    async getSeances({ commit }, date = new Date()) {
      try {
        commit("toggleLoading", true);
        const seances = await moviesApi.getSeancesByDate(date);
        commit("setSeances", seances.data);
      } catch {
        commit("setError", {
          status: true,
          message: "Request failed. Please try again later.",
        });
      } finally {
        commit("toggleLoading", false);
      }
    },
  },
};

export default movies;

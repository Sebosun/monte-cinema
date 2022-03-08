import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    loading: true,
    error: { status: false, message: "" },
  },
  getters: {
    getMovies: (state) => state.movies,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
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
    async getMovies(state) {
      try {
        const movies = await axios("http://localhost:3000/movies");
        state.commit("setMovies", movies.data);
      } catch {
        state.commit("setError", {
          status: true,
          message: "Request failed. Please try again later.",
        });
      } finally {
        state.commit("toggleLoading");
      }
    },
  },
  modules: {},
});

import Vue from "vue";
import Vuex from "vuex";
import * as moviesApi from "@/helpers/api/movies";
import user from "@/store/modules/user";

Vue.use(Vuex);

//TODO namespaces
export default new Vuex.Store({
  modules: { user },
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
    async getMovies({ commit }) {
      try {
        const movies = await moviesApi.getAllMovies();
        console.log(movies);
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
});

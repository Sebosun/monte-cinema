import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
  },
  getters: {
    getMovies: (state) => state.movies,
  },
  mutations: {
    setMovies(state, payload) {
      state.movies = payload;
    },
  },
  actions: {
    async getMovies(state) {
      const movies = await axios("http://localhost:3000/movies");
      state.commit("setMovies", movies.data);
    },
  },
  modules: {},
});

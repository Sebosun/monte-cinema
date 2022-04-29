import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import movies from "@/store/modules/movies";
import checkout from "@/store/modules/checkout";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, movies, checkout },
  state: {
    redirect: { wasTriggered: false, redirectTo: "/" },
  },
  getters: {
    redirect: (state) => state.redirect.wasTriggered,
    redirectTo: (state) => state.redirect.redirectTo,
  },
  mutations: {
    setRedirect(state, payload) {
      state.redirect = payload;
    },
  },
  actions: {
    redirectUserAfterLogin({ commit }, path) {
      commit("setRedirect", { wasTriggered: true, redirectTo: path });
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import movies from "@/store/modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, movies },
});

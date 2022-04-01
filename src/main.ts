import Vue from "vue";
import router from "@/router";
import store from "./store";
import App from "./App.vue";

import Notifications from "vue-notification";
import VueRouter from "vue-router";
import VCalendar from "v-calendar";
import VueCompositionAPI from "@vue/composition-api";

import Meta from "vue-meta";

Vue.config.productionTip = false;

store.dispatch("user/restoreUserData");

Vue.use(Meta);
Vue.use(VueCompositionAPI);
Vue.use(VueRouter);
Vue.use(Notifications);
Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

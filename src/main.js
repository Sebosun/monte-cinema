import Vue from "vue";
import VCalendar from "v-calendar";
import router from "@/router";

import App from "./App.vue";

import VueRouter from "vue-router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

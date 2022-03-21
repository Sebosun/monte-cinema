import Vue from "vue";
import router from "@/router";
import store from "./store";
import App from "./App.vue";

import VueRouter from "vue-router";
import VCalendar from "v-calendar";

import Meta from "vue-meta";

Vue.config.productionTip = false;
// TODO call store in here and setup headers before app launches

Vue.use(Meta);
Vue.use(VueRouter);
Vue.use(VCalendar, {
  componentPrefix: "vc",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

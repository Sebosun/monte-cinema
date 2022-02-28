import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/404",
    name: "Not Found",
    component: NotFoundPage,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

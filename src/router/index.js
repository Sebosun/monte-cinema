import VueRouter from "vue-router";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";

const routes = [...publicRoutes, ...protectedRoutes];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

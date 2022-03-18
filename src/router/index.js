import VueRouter from "vue-router";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import store from "@/store";

const routes = [...publicRoutes, ...protectedRoutes];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["user/isLoggedIn"]) {
      store.dispatch("redirectUserAfterLogin", to.fullPath);
      next({
        path: "Login",
        replace: true,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;

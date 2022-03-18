import BookingPage from "@/views/BookingPage.vue";
import store from "@/store";
export default [
  {
    path: "/booking",
    redirect: "/screenings",
  },
  {
    path: "/booking/:id",
    name: "Booking",
    component: BookingPage,
    props: true,
    beforeEnter(to, from, next) {
      if (store.getters["user/isLoggedIn"]) {
        next();
      } else {
        store.dispatch("redirectUserAfterLogin", to.fullPath);
        next({
          path: "Login",
          replace: true,
        });
      }
    },
  },
];

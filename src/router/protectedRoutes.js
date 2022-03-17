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
      console.log(store.getters);
      if (store.getters["user/isLoggedIn"]) {
        next();
      } else {
        next({
          path: "Login",
          replace: true,
        });
      }
    },
  },
];

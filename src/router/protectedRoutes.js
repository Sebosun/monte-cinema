import BookingPage from "@/views/BookingPage.vue";
import MyAccountPage from "@/views/MyAccountPage.vue";
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
    meta: { requiresAuth: true },
  },
  {
    path: "/my-account",
    name: "Account",
    component: MyAccountPage,
    meta: { requiresAuth: true },
  },
];

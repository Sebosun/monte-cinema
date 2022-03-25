import BookingPage from "@/views/BookingPage.vue";
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
];

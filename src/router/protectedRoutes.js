import BookingPage from "@/views/BookingPage.vue";
import MyAccountPage from "@/views/MyAccountPage.vue";
import EmployeeDeskPage from "@/views/employee/EmployeeDeskPage.vue";

export default [
  {
    path: "/booking",
    redirect: "/screenings",
    meta: { requiresAuth: true },
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
  {
    path: "/desk",
    name: "Desk",
    component: EmployeeDeskPage,
    meta: { requiresAuth: true },
  },
];

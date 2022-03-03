import VueRouter from "vue-router";

import HomePage from "@/views/HomePage";
import NotFoundPage from "@/views/NotFoundPage";
import MoviesPage from "@/views/MoviesPage";
import MovieDetailsPage from "@/views/MovieDetailsPage";
import ContactPage from "@/views/ContactPage";
import ScreeningsPage from "@/views/ScreeningsPage";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  {
    path: "/movies",
    name: "Movies",
    component: MoviesPage,
  },
  {
    path: "/movies/:id",
    name: "Movie Details",
    component: MovieDetailsPage,
    props: true,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/screenings",
    name: "Screenings",
    component: ScreeningsPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  { path: "/404", name: "NotFound", component: NotFoundPage },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

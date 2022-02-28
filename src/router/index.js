import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import MovieDetailsPage from "@/views/MovieDetailsPage.vue";
import NestedPage from "@/views/NestedPage.vue";
import MainHeader from "@/components/MainHeader";
import HeroSection from "@/components/HeroSection";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  {
    path: "/movie/:id",
    name: "Movie Details",
    component: MovieDetailsPage,
    props: (route) => {
      return {
        movieId: route.params.id,
      };
    },
  },
  {
    path: "/nested",
    name: "Nested Route",
    component: NestedPage,
    children: [
      {
        name: "NestedHeader",
        path: "",
        component: MainHeader,
      },
      {
        name: "NestedHero",
        path: "hero",
        component: HeroSection,
      },
    ],
  },
  { path: "/404", name: "NotFound", component: NotFoundPage },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

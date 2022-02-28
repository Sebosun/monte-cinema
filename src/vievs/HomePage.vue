<script>
import MovieCard from "@/components/UI/MovieCard";
import MainHeader from "@/components/MainHeader";
import HeroSection from "@/components/HeroSection";
import SoonSection from "@/components/SoonSection.vue";

export default {
  name: "App",
  components: {
    MovieCard,
    MainHeader,
    HeroSection,
    SoonSection,
  },
};
</script>

<template>
  <div>
    <main-header />
    <main class="main">
      <hero-section />
      <soon-section />
    </main>
    <br />
    <movie-card />
  </div>
</template>

<style scoped></style>

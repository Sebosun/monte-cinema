<script>
import MovieCard from "@/components/UI/MovieCard";
import HeroSection from "@/components/HeroSection";
import SoonSection from "@/components/SoonSection.vue";
import Screenings from "@/components/Screenings.vue";

export default {
  name: "App",
  components: {
    MovieCard,
    HeroSection,
    SoonSection,
    Screenings,
  },
};
</script>

<template>
  <div>
    <main class="main">
      <hero-section />
      <soon-section />
    </main>
    <br />
    <movie-card />
    <screenings />
  </div>
</template>

<style scoped></style>

<script>
import MovieCard from "@/components/UI/MovieCard";
import HeroSection from "@/components/HeroSection";
import SoonSection from "@/components/SoonSection.vue";
import Screenings from "@/components/Screenings.vue";
import ContactSection from "@/components/ContactSection.vue";

export default {
  name: "Home",
  props: ["genre", "query"],
  created() {
    console.log(this.genre);
    console.log(this.query);
  },
  components: {
    MovieCard,
    HeroSection,
    SoonSection,
    Screenings,
    ContactSection,
  },
};
</script>

<template>
  <div>
    <main class="main">
      <hero-section />
      <soon-section />
      <movie-card />
      <screenings />
    </main>
    <contact-section />
  </div>
</template>

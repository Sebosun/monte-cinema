<script>
import MovieCard from "@/components/UI/MovieCard";
import HeroSection from "@/components/sections/HeroSection";
import SoonSection from "@/components/sections/SoonSection.vue";
import Screenings from "@/components/sections/Screenings.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "Home",
  components: {
    MovieCard,
    HeroSection,
    SoonSection,
    Screenings,
    ContactSection,
    MainHeader,
  },
};
</script>
, MainHeader
<template>
  <div>
    <MainHeader />
    <main class="main">
      <HeroSection />
      <SoonSection />
      <MovieCard />
      <Screenings />
    </main>
    <ContactSection />
  </div>
</template>

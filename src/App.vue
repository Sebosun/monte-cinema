<template>
  <div id="app">
    <main-header />
    <main class="main">
      <hero-section />
      <soon-section />
    </main>
    <br />
    <movie-card />
    <Screenings />
  </div>
</template>

<script>
import MovieCard from "./components/UI/MovieCard";
import MainHeader from "./components/MainHeader";
import HeroSection from "./components/HeroSection";
import SoonSection from "./components/SoonSection.vue";
import Screenings from "./components/Screenings.vue";

export default {
  name: "App",
  components: {
    MovieCard,
    MainHeader,
    HeroSection,
    SoonSection,
    Screenings,
  },
};
</script>

<style lang="scss">
@import "./styles/normalize.css";
@import "./styles/variables.css";
@import "./scss/_mixins.scss";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@600&family=Roboto+Mono:wght@400;500&family=Roboto:wght@400;700&display=swap");

:root {
  font-family: "Roboto", sans-serif;
  background-color: var(--color-background);
}

@include media-md {
  #app {
    margin-inline: 48px;
  }
}

.background--rose {
  background-color: var(--color-rose);
}

.font--header {
  font-family: Eczar;
  font-weight: 600;
}
.font--paragraph {
  font-family: Roboto Mono;
  font-weight: 400;
}
.font--bold {
  font-weight: bold;
}
</style>

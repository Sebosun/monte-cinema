<template>
  <div id="app">
    <main-header />
    <main class="main">
      <hero-section class="background--rose" />
    </main>
    <br />
    <movie-card />
    <div class="background--rose">:)</div>
  </div>
</template>

<script>
/* import UiButton from "./components/UI/UiButton"; */
import MovieCard from "./components/UI/MovieCard";
import MainHeader from "./components/MainHeader";
import HeroSection from "./components/HeroSection";

export default {
  name: "App",
  components: {
    /* UiButton, */
    MovieCard,
    MainHeader,
    HeroSection,
  },
};
</script>

<style lang="scss">
@import "./normalize.css";
@import "./variables.css";
@import "./scss/_mixins.scss";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@600&family=Roboto+Mono:wght@400;500&family=Roboto:wght@400;700&display=swap");

:root {
  font-family: "Roboto", sans-serif;
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

#app {
  color: #2c3e50;
}
</style>

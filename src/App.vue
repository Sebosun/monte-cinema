<template>
  <div id="app">
    <main-header />
    <hero-section />
    <br />
    <ui-button small variation="brand">Hello Vue</ui-button>
    <ui-button medium variation="brand empty">Hello Vue</ui-button>
    <ui-button large variation="primary">Hello Vue</ui-button>
    <ui-button large variation="primary selected">Hello Vue</ui-button>
    <movie-card />
    <div class="background--rose">:)</div>
  </div>
</template>

<script>
import UiButton from "./components/UI/UiButton";
import MovieCard from "./components/UI/MovieCard";
import MainHeader from "./components/MainHeader";
import HeroSection from "./components/HeroSection";

export default {
  name: "App",
  components: {
    UiButton,
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

.title {
  font-family: Eczar;
  font-size: 5rem;
  font-weight: 600;
  line-height: 82px;
  letter-spacing: -0.01em;
}

#app {
  color: #2c3e50;
}
</style>

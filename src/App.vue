<template>
  <div id="app">
    <Header />
    <h1 class="title">Welcome to the best Cinema in Monterail</h1>
    <br />
    <Button small variation="brand">Hello Vue</Button>
    <Button medium variation="brand empty">Hello Vue</Button>
    <Button large variation="primary">Hello Vue</Button>
    <Button large variation="primary selected">Hello Vue</Button>
    <MovieCard />
    <div class="background--rose">:)</div>
  </div>
</template>

<script>
import Button from "./components/UI/Button.vue";
import MovieCard from "./components/UI/MovieCard.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Button,
    MovieCard,
    Header,
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

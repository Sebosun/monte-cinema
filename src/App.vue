<template>
  <div id="app">
    <h1 class="title">Welcome to the best Cinema in Monterail</h1>
    <br />
    <Buttons />
    <MovieCard />
  </div>
</template>

<script>
import Buttons from "./components/UI/Buttons.vue";
import MovieCard from "./components/UI/MovieCard.vue";

export default {
  name: "App",
  components: {
    Buttons,
    MovieCard,
  },
};
</script>

<style lang="scss">
@import "./normalize.css";
@import "./variables.css";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@600&family=Roboto+Mono:wght@400;500&family=Roboto:wght@400;700&display=swap");

:root {
  font-family: "Roboto", sans-serif;
}

.title {
  font-family: Eczar;
  font-size: 5rem;
  font-weight: 600;
  line-height: 82px;
  letter-spacing: -0.01em;
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

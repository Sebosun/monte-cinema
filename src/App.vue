<script>
export default {
  created() {
    this.$store.dispatch("user/restoreUserData");
    this.$store.dispatch("movies/getMovies");
    this.$i18n.locale = localStorage.getItem("user-lang");
  },
  metaInfo: {
    title: "",
    titleTemplate: "%s | Monte Cinema",
  },
  mounted() {},
};
</script>

<template>
  <div id="app">
    <router-view />
    <notifications position="bottom center" />
  </div>
</template>

<style lang="scss">
@import "./styles/normalize.css";
@import "./styles/variables.css";
@import url("https://fonts.googleapis.com/css2?family=Eczar:wght@600&family=Roboto+Mono:wght@400;500&family=Roboto:wght@400;700&display=swap");

:root {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}

@include media-md {
  #app {
    max-width: 1440px;
    padding-inline: 48px;
    margin-inline: auto;
  }
}

/* just so i dont have to do this in every component */
a {
  text-decoration: none;
  color: inherit;
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
.font--label {
  font-size: 14px;
  text-transform: uppercase;
  color: var(--color-red);
  font-family: Roboto Mono;
  line-height: 18.46px;
}
</style>

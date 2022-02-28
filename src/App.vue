<template>
  <div id="app">
    <main-header />
    <router-view />
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
export default {
  components: { MainHeader },
};
</script>

<style lang="scss">
@import "./styles/normalize.css";
@import "./styles/variables.css";
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
.font--label {
  font-size: 14px;
  text-transform: uppercase;
  color: var(--color-red);
  font-family: Roboto Mono;
  font-weight: 700;
  line-height: 18.46px;
}
</style>

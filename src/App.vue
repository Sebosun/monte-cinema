<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Buttons />
  </div>
</template>

<script>
import Buttons from "./components/UI/Buttons.vue";

export default {
  name: "App",
  components: {
    Buttons,
  },
};
</script>

<style lang="scss">
@import "./normalize.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

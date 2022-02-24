TODO: Get vue svg loader to load svgs
<template>
  <header class="header">
    <MonteCinemaLogo />
    <HamburgerMenu />
  </header>
</template>

<script>
import MonteCinemaLogo from "../assets/monte cinema.svg";
import HamburgerMenu from "../assets/navigation-menu 1.svg";

export default {
  components: {
    MonteCinemaLogo,
    HamburgerMenu,
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-around;
}
</style>

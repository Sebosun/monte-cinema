<script>
import MonteCinemaLogo from "@/assets/monte cinema.svg";
export default {
  components: { MonteCinemaLogo },
};
</script>
<template>
  <header class="header">
    <router-link to="/">
      <monte-cinema-logo />
    </router-link>

    <div>Developed with <span>♥</span> by Monterail</div>
  </header>
</template>
<style scoped>
.header {
  padding: 29px 0;
  font-size: 1rem;
  font-family: Roboto Mono;
  font-weight: 500;
  line-height: 21px;
  text-align: right;
  text-transform: uppercase;

  color: var(--color-primary);
}
span {
  color: var(--color-brand);
}
</style>

<template>
  <section class="hero">
    <h1 class="hero__title font--header">
      Welcome to the best Cinema in Monterail
    </h1>
    <p class="font--paragraph">
      Best movies, best experiences, best people. And all that doesn't exist.
      Yikes.
    </p>
    <ui-button medium variation="brand">Book a ticket</ui-button>
  </section>
</template>

<script>
import UiButton from "./UI/UiButton.vue";
export default {
  components: {
    UiButton,
  },
};
</script>

<style lang="scss" scoped>
.hero {
  padding: 40px 32px;
  text-align: center;
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-direction: column;
  align-content: center;

  &__title {
    font-size: 3rem;
    line-height: 49px;
    letter-spacing: -0.01em;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 22px;
    line-height: 37.4px;
  }
}
</style>

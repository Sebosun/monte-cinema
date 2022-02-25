<script>
import UiButton from "./UI/UiButton.vue";
export default {
  components: {
    UiButton,
  },
};
/* TOOD reccheck image responsivity */
/* TODO turn pxs into rems */
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper">
      <h1 class="hero__wrapper__title font--header">
        Welcome to the best Cinema in Monterail
      </h1>
      <p class="font--paragraph">
        Best movies, best experiences, best people.
        <br class="hero__wrapper__break" />
        And all that doesn't exist. Yikes.
      </p>
      <ui-button medium variation="brand">Book a ticket</ui-button>
    </div>
    <img src="../assets/hero_img.png" alt="cinema" />
  </section>
</template>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
.hero {
  &__wrapper {
    padding: 40px 32px;
    text-align: center;
    display: flex;
    gap: 40px;
    justify-content: center;
    flex-direction: column;
    align-content: center;

    &__break {
      display: none;
    }

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

  img {
    display: none;
  }

  @include media-md {
    &__wrapper {
      text-align: left;
      padding: 80px;
      gap: 41px;
      &__title {
        font-size: 80px;
        line-height: 102%;
        letter-spacing: 0.03em;
      }
      p {
        white-space: pre-line;
      }
      &__break {
        display: block;
      }
      button {
        max-width: fit-content;
        font-size: 18px;
        padding: 19px 40px;
        margin-left: -4px;
      }
    }
  }

  @include media-lg {
    display: grid;
    padding-right: 0px;
    grid-template-columns: 68% 40%;
    overflow: hidden;
    img {
      display: block;
      object-fit: cover;
      height: 100%;
    }
  }
}
</style>

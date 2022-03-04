<script>
import UiButton from "@/components/UI/UiButton.vue";
export default {
  components: {
    UiButton,
  },
};
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper background--rose">
      <h1 class="hero__wrapper__title font--header">
        Welcome to the best Cinema in Monterail
      </h1>
      <p class="font--paragraph">
        Best movies, best experiences, best people.
        <br class="hero__wrapper__break" />
        And all that doesn't exist. Yikes.
      </p>
      <ui-button medium colors="brand">Book a ticket</ui-button>
    </div>
    <img src="@/assets/hero_image.jpg" alt="cinema" />
  </section>
</template>

<style lang="scss" scoped>
.hero {
  &__wrapper {
    padding: 2.5rem 2rem;
    text-align: center;
    gap: 2.5rem;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-content: center;

    &__break {
      display: none;
    }

    &__title {
      font-size: 3rem;
      line-height: 3.0625rem;
      letter-spacing: -0.01em;
      margin: 0;
    }
    p {
      margin: 0;
      font-size: 1.375rem;
      line-height: 37.4px;
    }
  }

  img {
    display: none;
  }

  @include media-md {
    &__wrapper {
      text-align: left;
      padding: 5rem;
      gap: 2.5625rem;
      &__title {
        font-size: 5rem;
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
        font-size: 1.125rem;
        padding: 1.1875rem 2.5rem;
        margin-left: -0.25rem;
      }
    }
  }

  @include media-lg {
    overflow: hidden;
    padding-right: 0rem;
    display: grid;
    grid-template-columns: minmax(880px, 60%) 40%;

    img {
      display: block;
      height: 100%;
      max-width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>

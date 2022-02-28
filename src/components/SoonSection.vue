<template>
  <section class="soon">
    <div class="soon__top">
      <h2 class="font--paragraph font--bold soon__show--sm">Soon</h2>
      <h2 class="font--paragraph font--bold soon__show--md">
        Soon in the cinema
      </h2>
      <h2 class="font--paragraph font--bold"></h2>
      <ui-button class="font--bold" empty borderless colors="brand"
        >See All</ui-button
      >
    </div>
    <div class="soon__wrapper">
      <movie-card class="soon__movies">
        <div class="soon__movies__data">
          <h2 class="font--bold">Predator</h2>
          <div class="font--bold">1h 30 min</div>
        </div>
        <img src="../assets/arnie.png" alt="arnie" />
        <div class="soon__movies__genres">Action</div>
      </movie-card>
      <movie-card class="soon__movies">
        <div class="soon__movies__data">
          <h2 class="font--bold">Predator</h2>
          <div class="font--bold">1h 30 min</div>
        </div>
        <img src="../assets/arnie.png" alt="arnie" />
        <div class="soon__movies__genres">Action</div>
      </movie-card>

      <movie-card class="soon__movies">
        <div class="soon__movies__data">
          <h2 class="font--bold">Predator</h2>
          <div class="font--bold">1h 30 min</div>
        </div>
        <img src="../assets/arnie.png" alt="arnie" />
        <div class="soon__movies__genres">Action</div>
      </movie-card>
    </div>
  </section>
</template>

<script>
import MovieCard from "./UI/MovieCard.vue";
import UiButton from "./UI/UiButton.vue";
export default { components: { UiButton, MovieCard } };
</script>

<style lang="scss" scoped>
@import "../scss/_mixins.scss";

.soon {
  padding-inline: 24px;
  &__top {
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 22px;
      line-height: 170%;
      letter-spacing: 0.015em;
      text-transform: uppercase;
    }

    button {
      font-size: 22px;
      text-transform: uppercase;
    }
  }

  &__show {
    &--sm {
      display: block;
    }
    &--md {
      display: none;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__movies {
    padding: 24px;

    gap: 16px;
    display: flex;
    flex: 1;
    flex-direction: column;

    &:last-of-type {
      display: none;
    }
    h2 {
      margin: 0;
      padding: 0;
      font-size: 36px;
      line-height: 42px;
    }

    img {
      height: auto;
      max-width: 100%;
      object-fit: cover;
    }
    &__data {
      div {
        color: var(--color-secondary);
      }
    }

    &__genres {
      font-size: 14px;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 24px;
      max-width: fit-content;
      color: var(--color-red);
      background: var(--color-rose);
    }
  }
  @include media-md {
    padding-inline: 0;

    &__top {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 22px;
        line-height: 170%;
        letter-spacing: 0.015em;
        text-transform: uppercase;
      }

      button {
        font-size: 22px;
        text-transform: uppercase;
      }
    }

    &__show {
      &--sm {
        display: none;
      }
      &--md {
        display: block;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: row;

      gap: 20px;
    }

    &__movies {
      flex: 1;
    }
  }

  @include media-lg {
    &__wrapper {
      display: grid;
      max-width: 100%;
    }

    &__movies {
      &:last-of-type {
        display: flex;
      }
    }
    padding-inline: 0;

    &__top {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 22px;
        line-height: 170%;
        letter-spacing: 0.015em;
        text-transform: uppercase;
      }

      button {
        font-size: 22px;
        text-transform: uppercase;
      }
    }

    &__show {
      &--sm {
        display: none;
      }
      &--md {
        display: block;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: row;

      gap: 20px;
    }

    &__movies {
      flex: 1;
    }
  }
}
</style>

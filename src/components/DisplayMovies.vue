<script>
import MovieCard from "./UI/MovieCard.vue";
import Tags from "./UI/Tags.vue";
import UiButton from "./UI/UiButton.vue";

export default {
  components: { MovieCard, Tags, UiButton },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    movieLength(length) {
      const hours = Math.floor(length / 60);
      const minutes = `0${length % 60}`.slice(-2);
      return `${hours}h ${minutes}`;
    },
  },
};
</script>

<template>
  <movie-card class="display-movies">
    <div class="display-movies__wrapper">
      <div class="display-movies__fill">
        <img :src="movie.poster_url" :alt="movie.title" />
      </div>
      <div class="display-movies__card">
        <h2>{{ movie.title }}</h2>
        <div class="display-movies__info">
          <tags class="display-movies__info--name">{{ movie.genre.name }}</tags>
          <div class="display-movies__info--len">
            {{ movieLength(movie.length) }} min
          </div>
        </div>
      </div>
    </div>
    <div class="display-movies__buttons">
      <ui-button empty colors="brand">21:45</ui-button>
      <ui-button empty colors="brand">21:45</ui-button>
      <ui-button empty colors="brand">21:45</ui-button>
      <ui-button empty colors="brand">21:45</ui-button>
      <ui-button empty colors="brand">21:45</ui-button>
    </div>
  </movie-card>
</template>

<style scoped lang="scss">
.display-movies {
  padding: 2rem 1rem;

  &__wrapper {
    gap: 0.625rem;
    margin-bottom: 1rem;
  }

  &__fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    float: left;
    margin-right: 0.625rem;
  }

  &__fill img {
    max-height: 4.25rem;
    min-width: 4.25rem;
    object-fit: cover;
    object-position: center;

    margin-bottom: auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
  }

  &__card h2 {
    font-size: 1.5rem;
    margin: 0;
    padding-bottom: 0.5rem;

    white-space: nowrap;
    display: flex;
    overflow: auto;
  }

  &__info {
    margin-bottom: 0.5rem;

    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  &__buttons {
    width: 100%;
    padding: 0.625rem 0;
    max-width: min-content;
    margin: 0;
    display: flex;
    overflow-x: auto;
  }

  &__buttons button {
    padding: 0.3125rem 1rem;
  }

  &__buttons button + button {
    margin-left: 0.5rem;
  }

  &__info &__info--len {
    font-size: 0.875rem;
    color: var(--color-secondary);
  }
}

@include media-md {
  img {
    max-height: 8.25rem;
    max-width: 100%;
    object-fit: cover;
  }

  .display-movies {
    &__card {
      display: flex;
      flex-direction: column;
    }

    &__card h2 {
      margin: 0;
      padding: 0;
    }

    &__card button {
      max-width: min-content;
      margin-top: auto;
    }

    &__info {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;

      display: flex;
      gap: 1.25rem;
      align-items: center;
    }

    &__info &__info--len {
      font-size: 0.875rem;
      color: var(--color-secondary);
    }
  }
}
</style>

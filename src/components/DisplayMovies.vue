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
  padding: 32px 16px;

  &__wrapper {
    gap: 10px;
    margin-bottom: 16px;
  }

  &__fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    float: left;
    margin-right: 10px;
  }

  &__fill img {
    max-height: 68px;
    min-width: 68px;
    object-fit: cover;
    object-position: center;

    margin-bottom: auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
  }

  &__card h2 {
    font-size: 24px;
    margin: 0;
    padding-bottom: 8px;

    white-space: nowrap;
    display: flex;
    overflow: auto;
  }

  &__info {
    margin-bottom: 8px;

    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__buttons {
    width: 100%;
    padding: 10px 0;
    max-width: min-content;
    margin: 0;
    display: flex;
    overflow-x: auto;
  }

  &__buttons button {
    padding: 5px 16px;
  }

  &__buttons button + button {
    margin-left: 8px;
  }

  &__info &__info--len {
    font-size: 14px;
    color: var(--color-secondary);
  }
}

@include media-md {
  img {
    max-height: 132px;
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
      margin-top: 8px;
      margin-bottom: 8px;

      display: flex;
      gap: 20px;
      align-items: center;
    }

    &__info &__info--len {
      font-size: 14px;
      color: var(--color-secondary);
    }
  }
}
</style>

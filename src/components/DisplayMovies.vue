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
  <movie-card>
    <img :src="movie.poster_url" :alt="movie.title" />
    <div class="display-movies__card">
      <h2>{{ movie.title }}</h2>
      <div class="display-movies__info">
        <tags class="display-movies__info--name">{{ movie.genre.name }}</tags>
        <div class="display-movies__info--len">
          {{ movieLength(movie.length) }} min
        </div>
      </div>
      <ui-button empty small colors="brand">21:45</ui-button>
    </div>
  </movie-card>
</template>

<style scoped lang="scss">
img {
  height: max(132px);
  max-width: 100%;
  object-fit: cover;
}

.display-movies {
  &__card {
    display: flex;
    flex-direction: column;

    h2 {
      margin: 0;
      padding: 0;
    }

    button {
      max-width: min-content;
      margin-top: auto;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 20px;
    &--len {
      font-size: 14px;
      color: var(--color-secondary);
    }
  }
}
</style>

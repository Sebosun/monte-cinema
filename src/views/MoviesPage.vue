<script>
import MainHeader from "@/components/MainHeader.vue";
import MovieItem from "@/components/chunks/MovieItem.vue";

export default {
  name: "MoviesPage",
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    error() {
      return this.$store.getters.getError;
    },
    movies() {
      return this.$store.getters.getMovies;
    },
  },
  components: { MainHeader, MovieItem },
};
</script>

<template>
  <div class="movies">
    <main-header />
    <h1 class="font--header">All the movies</h1>
    <div v-if="loading" class="screenings__loading">Loading...</div>
    <div v-else-if="error.status" class="screenings__error">
      <ErrorMessage>{{ error.message }}</ErrorMessage>
    </div>
    <div v-else class="movies__list">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<style lang="scss">
.movies {
  margin-inline: 24px;

  @include media-sm {
    &__list {
      display: flex;
      flex-flow: column;
      max-width: 100%;
      max-width: 460px;
      margin-inline: auto;
      gap: 24px;
    }
    h1 {
      font-size: 48px;
      text-align: center;
    }
  }
  @include media-md {
    h1 {
      font-size: 80px;
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      gap: 10px;
    }
  }

  @include media-lg {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: auto;
      gap: 10px;
    }
  }
}
</style>

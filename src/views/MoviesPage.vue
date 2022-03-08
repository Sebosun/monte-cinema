<script>
import MainHeader from "@/components/MainHeader.vue";
import MovieItem from "@/components/chunks/MovieItem.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";

export default {
  name: "MoviesPage",
  data() {
    return {
      search: "",
    };
  },
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
    searchQuery() {
      let re = new RegExp(this.search, "i");
      return this.movies.filter((movie) => movie.title.match(re));
    },
  },
  components: { MainHeader, MovieItem, LoadingSpinner },
};
</script>

<template>
  <div class="movies">
    <main-header />
    <div class="movies--wrapper">
      <h1 class="font--header">All the movies</h1>
      <div class="movies__inputs">
        <label class="label font--label" for="search">Search</label>
        <input v-model="search" class="input" name="search" type="text" />
      </div>
      <div v-if="loading" class="screenings__loading"><LoadingSpinner /></div>
      <div v-else-if="error.status" class="screenings__error">
        <ErrorMessage>{{ error.message }}</ErrorMessage>
      </div>
      <div v-else class="movies__list">
        <movie-item
          v-for="movie in searchQuery"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movies {
  .label {
    display: block;
  }
  .input {
    @include input;
  }

  @include media-sm {
    &--wrapper {
      margin-inline: 24px;
    }
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

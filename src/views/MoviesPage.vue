<script>
import MainHeader from "@/components/MainHeader.vue";
import MovieItem from "@/components/chunks/MovieItem.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import getGenres from "@/helpers/getGenres";

export default {
  name: "MoviesPage",
  data() {
    return {
      search: "",
      selectedGenre: "",
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
    genres() {
      return getGenres(this.movies);
    },
    searchQuery() {
      let re = new RegExp(this.search, "i");
      return this.movies.filter((movie) => movie.title.match(re));
    },
    filterMoviesByGenre() {
      const filteredMovies = this.searchQuery.filter(
        (movie) => movie.genre.name === this.selectedGenre
      );
      return this.selectedGenre == "" ? this.searchQuery : filteredMovies;
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
        <input
          placeholder="What are you looking for?"
          v-model="search"
          class="input"
          name="search"
          type="text"
        />
        <label for="genres" class="font--label">Movie</label>
        <select class="input" name="genres" v-model="selectedGenre">
          <option selected value="">All movies</option>
          <option v-for="genre in genres" :value="genre.name" :key="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div v-if="loading" class="screenings__loading"><LoadingSpinner /></div>
      <div v-else-if="error.status" class="screenings__error">
        <ErrorMessage>{{ error.message }}</ErrorMessage>
      </div>
      <div v-else class="movies__list">
        <MovieItem
          v-for="movie in filterMoviesByGenre"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movies {
  &__inputs {
    margin-inline: auto;
  }
  .label {
    display: block;
  }
  .input {
    @include input;
    width: 100%;
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

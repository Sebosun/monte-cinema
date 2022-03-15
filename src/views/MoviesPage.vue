<script>
import MainHeader from "@/components/MainHeader.vue";
import MovieItem from "@/components/chunks/MovieItem.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import getGenres from "@/helpers/getGenres";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";

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
      return this.$store.getters["movies/loading"];
    },
    error() {
      return this.$store.getters["movies/error"];
    },
    movies() {
      return this.$store.getters["movies/allMovies"];
    },
    genres() {
      return getGenres(this.movies);
    },
    filterMoviesByName() {
      let re = new RegExp(this.search, "i");
      return this.movies.filter((movie) => movie.title.match(re));
    },
    filterMoviesByGenre() {
      const filteredMovies = this.filterMoviesByName.filter(
        (movie) => movie.genre.name === this.selectedGenre
      );
      return this.selectedGenre == ""
        ? this.filterMoviesByName
        : filteredMovies;
    },
  },
  metaInfo: {
    title: "All Movies",
    titleTemplate: "%s | Monte Cinema",
  },
  components: { MainHeader, MovieItem, LoadingSpinner, BreadcrumbNavigation },
};
</script>

<template>
  <div class="movies">
    <main-header />
    <BreadcrumbNavigation>Movies</BreadcrumbNavigation>
    <div v-if="loading" class="screenings__loading"><LoadingSpinner /></div>
    <div v-else-if="error.status" class="screenings__error">
      <ErrorMessage>{{ error.message }}</ErrorMessage>
    </div>
    <div v-else class="movies--wrapper">
      <h1 class="font--header">All the movies</h1>
      <!-- TODO: export this into a separate component -->
      <div class="movies__inputs">
        <div class="movies__inputs--search">
          <label class="label font--label" for="search">Search</label>
          <input
            placeholder="What are you looking for?"
            v-model="search"
            class="input"
            name="search"
            type="text"
          />
        </div>
        <div class="movies__inputs--select">
          <label for="genres" class="label font--label">Category</label>
          <select class="input" name="genres" v-model="selectedGenre">
            <option selected value="">All movies</option>
            <option v-for="genre in genres" :value="genre.name" :key="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="movies__list">
        <MovieItem
          v-for="movie in filterMoviesByGenre"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movies {
  &__inputs {
    margin-inline: auto;
    display: flex;
    flex-flow: column;
    gap: 40px;
    margin-bottom: 32px;
  }

  .label {
    display: block;
    margin-bottom: 12px;
  }
  .input {
    @include input;
    width: 100%;
  }

  @include media-sm {
    &--wrapper {
      margin: 40px 24px;
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
    &--wrapper {
      margin: 64px 0;
    }
    h1 {
      font-size: 80px;
    }
    &__inputs {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      &--select {
        margin-left: 20px;
      }
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      gap: 40px;
    }
  }

  @include media-lg {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: auto;
      gap: 40px;
    }
  }
}
</style>

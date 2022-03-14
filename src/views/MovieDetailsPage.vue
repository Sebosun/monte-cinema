<script>
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import MovieDescription from "@/components/chunks/MovieDescription.vue";
import ScreeningsForOneMovie from "@/components/sections/ScreeningsForOneMovie.vue";

import * as moviesApi from "@/helpers/api/movies";

export default {
  components: {
    ErrorMessage,
    MainHeader,
    BreadcrumbNavigation,
    ScreeningsForOneMovie,
    MovieDescription,
  },
  data() {
    return {
      movie: null,
      loading: true,
      screenings: [],
      error: { status: false, message: "" },
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.fetchMovie();
  },
  methods: {
    async fetchMovie() {
      try {
        const response = await moviesApi.getOneMovie(this.id);
        this.movie = response.data;
      } catch (err) {
        this.error = {
          status: true,
          message: "Unable to fetch movie. Please try again later.",
        };
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="movie-details">
    <MainHeader />
    <div v-if="loading">Loading....</div>
    <div v-else-if="error.status">
      <error-message>{{ error.message }}</error-message>
    </div>
    <div v-else>
      <BreadcrumbNavigation :nestedName="movie.title"
        >Movies</BreadcrumbNavigation
      >

      <MovieDescription :movie="movie" />
      <ScreeningsForOneMovie :movie="movie" />
    </div>
  </div>
</template>

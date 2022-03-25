<script lang="ts">
import Vue from "vue";

import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import MovieDescription from "@/components/chunks/MovieDescription.vue";
import ScreeningsForOneMovie from "@/components/sections/ScreeningsForOneMovie.vue";

import * as moviesApi from "@/helpers/api/movies";
import { Movie } from "@/interfaces/MovieTypes";

interface MetaInfo {
  title: string;
}

export default Vue.extend({
  name: "MovieDetails",
  data() {
    return {
      movie: {} as Movie,
      loading: true,
      error: { status: false, message: "Something went wrong" },
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    this.fetchMovie();
  },
  computed: {
    title(): string {
      if (this.movie) {
        return this.movie.title;
      } else {
        return "Monte Cinema";
      }
    },
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
  metaInfo(): MetaInfo {
    return { title: this.title };
  },
  components: {
    ErrorMessage,
    MainHeader,
    BreadcrumbNavigation,
    ScreeningsForOneMovie,
    MovieDescription,
  },
});
</script>

<template>
  <div class="movie-details">
    <MainHeader />
    <div v-if="loading">Loading....</div>
    <div v-else-if="error.status">
      <error-message>{{ error.message }}</error-message>
    </div>
    <div v-else>
      <BreadcrumbNavigation backPath="/movies" :nestedName="movie.title"
        >Movies</BreadcrumbNavigation
      >

      <MovieDescription :movie="movie" />
      <ScreeningsForOneMovie :movie="movie" />
    </div>
  </div>
</template>

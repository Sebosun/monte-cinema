<script lang="ts">
import Vue from "vue";
import Screenings from "@/components/sections/Screenings.vue";
import {
  Movie,
  ScreeningTypes,
  MovieWithScreenings,
} from "@/interfaces/MovieTypes";

export interface Error {
  status: boolean;
  message: string;
}

export default Vue.extend({
  data() {
    return {
      selectedDay: new Date() as Date,
    };
  },
  async mounted() {
    await this.fetchScreenings();
  },
  methods: {
    async fetchScreenings(date?: Date) {
      const fetchDate = date ? date : this.selectedDay;
      this.$store.dispatch("movies/getSeances", fetchDate);
    },
    changeDate(event: Date) {
      this.selectedDay = event;
    },
  },
  computed: {
    loading(): boolean {
      return this.$store.getters["movies/loading"];
    },
    error(): Error {
      return this.$store.getters["movies/error"];
    },
    movies(): Movie[] {
      return this.$store.getters["movies/allMovies"];
    },
    screenings(): ScreeningTypes[] {
      return this.$store.getters["movies/seances"];
    },
    moviesArrayWithScreeningDates(): MovieWithScreenings[] {
      return this.movies.map((movie) => {
        const screeningsForThisMovie = this.screenings.filter(
          (screening) => screening.movie === movie.id
        );
        return { ...movie, screenings: screeningsForThisMovie };
      });
    },
    isTheDayEmpty(): boolean {
      return this.screenings.length == 0;
    },
  },
  watch: {
    async selectedDay(day) {
      await this.fetchScreenings(day);
    },
  },
  components: { Screenings },
});
</script>

<template>
  <Screenings
    @changeDate="changeDate"
    :movies="moviesArrayWithScreeningDates"
    :selectedDay="selectedDay"
    :loading="loading"
    :error="error"
    :empty="isTheDayEmpty"
  />
</template>

<script>
import Screenings from "@/components/sections/Screenings.vue";
import * as moviesApi from "@/helpers/api/movies";
export default {
  data() {
    return {
      screenings: [],
      selectedDay: new Date(),
    };
  },
  async mounted() {
    await this.fetchScreenings();
  },
  methods: {
    async fetchScreenings(day = this.selectedDay) {
      const response = await moviesApi.getSeancesByDate(day);
      this.screenings = response.data;
    },
    changeDate(event) {
      console.log(event);
      this.selectedDay = event;
    },
  },
  computed: {
    movies() {
      return this.$store.getters.allMovies;
    },
    moviesArrayWithScreeningDates() {
      return this.movies.map((movie) => {
        const screeningsForThisMovie = this.screenings.filter(
          (screening) => screening.movie === movie.id
        );
        return { ...movie, screenings: screeningsForThisMovie };
      });
    },
    isTheDayEmpty() {
      return this.screenings.length == 0;
    },
  },
  watch: {
    async selectedDay(day) {
      await this.fetchScreenings(day);
    },
  },
  components: { Screenings },
};
</script>

<template>
  <Screenings
    @changeDate="changeDate"
    :movies="moviesArrayWithScreeningDates"
    :selectedDay="selectedDay"
    :empty="isTheDayEmpty"
  />
</template>

<style scoped></style>

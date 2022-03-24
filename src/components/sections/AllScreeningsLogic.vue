<script>
import Screenings from "@/components/sections/Screenings.vue";
export default {
  data() {
    return {
      selectedDay: new Date(),
    };
  },

  async mounted() {
    await this.fetchScreenings();
  },

  methods: {
    async fetchScreenings(date = this.selectedDay) {
      this.$store.dispatch("movies/getSeances", date);
    },
    changeDate(event) {
      console.log(event);
      this.selectedDay = event;
    },
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
    screenings() {
      return this.$store.getters["movies/seances"];
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
    :loading="loading"
    :error="error"
    :empty="isTheDayEmpty"
  />
</template>

<style scoped></style>

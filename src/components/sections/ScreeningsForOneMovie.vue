<script>
import * as moviesApi from "@/helpers/api/movies";
import Screenings from "./Screenings.vue";

export default {
  data() {
    return {
      screenings: [],
      selectedDay: new Date(),
      loading: true,
      error: { status: false, message: "Something went wrong" },
    };
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  async created() {
    this.getSingleScreening(this.movie.id);
  },
  methods: {
    async getSingleScreening(id) {
      this.loading = true;
      try {
        const response = await moviesApi.getSeancesByMovieId(id);
        this.screenings = response.data;
      } catch {
        this.error = { status: true, message: "Failed to fetch movies" };
      } finally {
        this.loading = false;
      }
    },
    changeDate(event) {
      this.selectedDay = event;
    },
  },
  computed: {
    selectedDayScreenings() {
      return this.screenings.filter((screening) => {
        const screeningDate = new Date(screening.datetime);
        return screeningDate.toDateString() === this.selectedDay.toDateString();
      });
    },
    moviesArrayWithScreeningDates() {
      return this.allMovies.map((movie) => {
        const screeningsForThisMovie = this.screenings.filter(
          (screening) => screening.movie === movie.id
        );
        return { ...movie, screenings: screeningsForThisMovie };
      });
    },
    mockMovieAsArray() {
      const arr = [];
      arr.push({ ...this.movie, screenings: this.selectedDayScreenings });
      return arr;
    },
    isTheDayEmpty() {
      return this.screenings.length == 0;
    },
  },
  components: {
    Screenings,
  },
};
</script>

<template>
  <Screenings
    :selectedDay="selectedDay"
    :movies="mockMovieAsArray"
    :empty="isTheDayEmpty"
    :loading="loading"
    :error="error"
    @changeDate="changeDate"
  />
</template>

<style scoped lang="scss"></style>

<script>
import * as moviesApi from "@/helpers/api/movies";
import Screenings from "./Screenings.vue";

export default {
  data() {
    return {
      screenings: [],
      selectedDay: new Date(),
    };
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  async created() {
    const seances = await this.getSingleSeance(this.movie.id);
    this.screenings = seances;
  },
  methods: {
    async getSingleSeance(id) {
      const response = await moviesApi.getSeancesByMovieId(id);
      return response.data;
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
    @changeDate="changeDate"
  />
</template>

<style scoped lang="scss"></style>

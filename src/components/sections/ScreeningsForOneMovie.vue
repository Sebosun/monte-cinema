<script>
/* TODO - Calendar*/
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
    try {
      const seances = await this.getSingleSeance(this.movie.id);
      this.screenings = seances;
      this.loading = false;
    } catch {
      this.loading = false;
      this.error = {
        status: true,
        message: "Something went wrong. Please try again",
      };
    }
  },
  methods: {
    async getSingleSeance(id) {
      const response = await moviesApi.getSeancesByMovieId(id);
      return response.data;
    },
    changeDate(event) {
      console.log(event);
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
    mockMovieAsArray() {
      const arr = [];
      arr.push({ ...this.movie, screenings: this.selectedDayScreenings });
      return arr;
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
    :empty="selectedDayScreenings.length == 0"
    @changeDate="changeDate"
  />
</template>

<style scoped lang="scss"></style>

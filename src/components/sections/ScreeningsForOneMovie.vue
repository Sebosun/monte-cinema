<script lang="ts">
import Vue, { PropType } from "vue";
import * as moviesApi from "@/helpers/api/movies.ts";
import Screenings from "./Screenings.vue";

interface Movie {
  id: number;
  title: string;
  genre: {
    id: number;
    name: string;
  };
  poster_url: string;
  length: number;
  release_date: string;
  description: string;
}

interface ScreeningTypes {
  id: number;
  datetime: string;
  movie: number;
  hall: number;
}

interface selectedDayScreenings extends Movie {
  screenings: ScreeningTypes[];
}

export default Vue.extend({
  data() {
    return {
      screenings: [] as ScreeningTypes[],
      selectedDay: new Date(),
      loading: true,
      error: { status: false, message: "Something went wrong" },
    };
  },
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  async created() {
    this.getSingleScreening(this.movie.id);
  },
  methods: {
    async getSingleScreening(id: number) {
      this.loading = true;
      try {
        const response = await moviesApi.getSeances({ id });
        this.screenings = response.data;
      } catch (error) {
        console.error(error);
        this.error = { status: true, message: "Failed to fetch movies" };
      } finally {
        this.loading = false;
      }
    },
    changeDate(event: Date) {
      this.selectedDay = event;
    },
  },
  computed: {
    selectedDayScreenings(): ScreeningTypes[] {
      return this.screenings.filter((screening) => {
        const screeningDate = new Date(screening.datetime);
        return screeningDate.toDateString() === this.selectedDay.toDateString();
      });
    },
    castMovieAsArray(): selectedDayScreenings[] {
      return [{ ...this.movie, screenings: this.selectedDayScreenings }];
    },
    isTheDayEmpty(): boolean {
      return this.selectedDayScreenings.length === 0;
    },
  },
  components: {
    Screenings,
  },
});
</script>

<template>
  <Screenings
    :selectedDay="selectedDay"
    :movies="castMovieAsArray"
    :empty="isTheDayEmpty"
    :loading="loading"
    :error="error"
    @changeDate="changeDate"
  />
</template>

<style scoped lang="scss"></style>

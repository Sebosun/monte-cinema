<script>
import MainHeader from "@/components/MainHeader.vue";
import ChooseSeatsSection from "@/components/sections/ChooseSeatsSection.vue";
import Tags from "@/components/UI/Tags.vue";
import ListOneMovie from "@/components/chunks/ListOneMovie.vue";

import genSeatsArr from "@/helpers/genSeatsArr";
import { showSeances, getHall, getOneMovie } from "@/helpers/api/movies";

export default {
  data() {
    return {
      seance: null,
      hall: null,
      movie: null,
      array: [],
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  watch: {
    seance(newSeances) {
      this.fetchHall(newSeances.hall);
      this.fetchMovie(newSeances.movie);
    },
  },
  mounted() {
    this.fetchShowSeances();
  },
  methods: {
    async fetchShowSeances() {
      const response = await showSeances(this.id);
      this.seance = response.data;
    },
    async fetchHall(id) {
      const response = await getHall(id);
      this.hall = response.data;
      const seatLength = response.data.seats / 10;
      this.array = genSeatsArr(seatLength, this.seance.taken_seats);
    },
    async fetchMovie(movieId) {
      const response = await getOneMovie(movieId);
      this.movie = response.data;
    },
    toggleTakeSeat(item) {
      const letter = item.value[0];
      const indexMainArr = this.array.findIndex((arr) => arr.row === letter);
      const indexNestArr = this.array[indexMainArr].array.findIndex((arr) => {
        return arr.value === item.value;
      });

      const nestedSelectedArr = this.array[indexMainArr].array[indexNestArr];

      if (!nestedSelectedArr.reserved) {
        nestedSelectedArr.taken = !nestedSelectedArr.taken;
      }
    },
  },
  computed: {
    loadingFinished() {
      return !!(this.hall && this.seance && this.movie);
    },
  },
  components: { MainHeader, ListOneMovie, Tags, ChooseSeatsSection },
};
</script>

<template>
  <div>
    <MainHeader />
    <div>Breadcrubs</div>
    <div v-if="loadingFinished">
      <ListOneMovie show :movie="movie">
        <Tags class="tag">{{ new Date().toUTCString() }}</Tags>
      </ListOneMovie>
      <main>
        <h1>Choose your seats</h1>
        <choose-seats-section @takeSeat="toggleTakeSeat" :array="array" />
        <div>Card</div>
        <div>Choose seats menu</div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag {
  font-size: 16px;
  color: var(--color-brand);
  font-family: "Roboto Mono";
  font-weight: 500;
  line-height: 100%;
  margin-top: auto;
}

p {
  margin: 0;
  padding: 0;
}
</style>

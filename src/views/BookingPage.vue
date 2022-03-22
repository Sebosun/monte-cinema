<script>
import MainHeader from "@/components/MainHeader.vue";
import ChooseSeatsSection from "@/components/sections/ChooseSeatsSection.vue";
import Tags from "@/components/UI/Tags.vue";
import ListOneMovie from "@/components/chunks/ListOneMovie.vue";

import genSeatsTable from "@/helpers/genSeatsTable";
import { showSeances, getHall, getOneMovie } from "@/helpers/api/movies";
import UiButton from "@/components/UI/UiButton.vue";

export default {
  data() {
    return {
      seance: null,
      hall: null,
      movie: null,
      array: [],
      chosenSeats: new Set(),
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  mounted() {
    this.fetchShowSeances();
  },
  watch: {
    seance(newSeances) {
      this.fetchHall(newSeances.hall);
      this.fetchMovie(newSeances.movie);
    },
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
      this.array = genSeatsTable(seatLength, this.seance.taken_seats);
    },
    async fetchMovie(movieId) {
      const response = await getOneMovie(movieId);
      this.movie = response.data;
    },
    toggleTakeSeat(seat) {
      const letter = seat.value[0];
      const indexMainArr = this.array.findIndex((arr) => arr.row === letter);
      const indexNestArr = this.array[indexMainArr].array.findIndex((arr) => {
        return arr.value === seat.value;
      });

      var nestedSelectedArr = this.array[indexMainArr].array[indexNestArr];

      if (!nestedSelectedArr.reserved) {
        nestedSelectedArr.taken = !nestedSelectedArr.taken;
        this.addChosenSeat(seat);
      }
    },
    addChosenSeat(seat) {
      const { value } = seat;
      if (this.chosenSeats.has(value)) {
        this.chosenSeats.delete(value);
        this.chosenSeats = new Set(this.chosenSeats);
      } else {
        this.chosenSeats = new Set(this.chosenSeats.add(value));
      }
    },
  },
  computed: {
    loadingFinished() {
      return !!(this.hall && this.seance && this.movie);
    },
  },
  components: { MainHeader, ListOneMovie, Tags, ChooseSeatsSection, UiButton },
};
</script>

<template>
  <div class="booking-page">
    <MainHeader />
    <div>Breadcrubs</div>
    <div v-if="loadingFinished">
      <ListOneMovie show :movie="movie">
        <Tags class="tag">{{ new Date(seance.datetime).toUTCString() }}</Tags>
      </ListOneMovie>
      <main class="booking-page__seats">
        <h1>Choose your seats</h1>
        <ChooseSeatsSection @takeSeat="toggleTakeSeat" :array="array" />
        <UiButton
          medium
          :disabled="chosenSeats.size === 0"
          colors="brand"
          class="booking-page__seats--button"
        >
          Choose {{ chosenSeats.size }} seats
        </UiButton>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking-page {
  p {
    margin: 0;
    padding: 0;
  }

  .tag {
    margin-top: auto;

    font-size: 16px;
    font-family: "Roboto Mono";
    font-weight: 500;
    line-height: 100%;
    color: var(--color-brand);
  }

  &__seats {
    margin: 50px 0;

    &--button {
      margin: 10px 0;
      display: flex;
      margin-left: auto;
    }
  }
}
</style>

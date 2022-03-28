<script lang="ts">
import Vue from "vue";
import MainHeader from "@/components/MainHeader.vue";
import ChooseSeatsSection from "@/components/sections/ChooseSeatsSection.vue";
import Tags from "@/components/UI/Tags.vue";
import ListOneMovie from "@/components/chunks/ListOneMovie.vue";

import genSeatsTable, { SeatsTable } from "@/helpers/genSeatsTable";
import { getOneSeance, getHall, getOneMovie } from "@/helpers/api/movies";
import { Movie } from "@/interfaces/MovieTypes";
import UiButton from "@/components/UI/UiButton.vue";
import SeatsPicker from "@/components/chunks/SeatsPicker.vue";

export interface Seat {
  taken: boolean;
  reserved: boolean;
  value: string;
}

export interface Hall {
  id: number;
  name: string;
  seats: number;
}

export interface Seance {
  available_seats: string[];
  datetime: string;
  hall: number;
  id: number;
  movie: number;
  taken_seats: string[];
}

export default Vue.extend({
  data() {
    return {
      seance: null as Seance | null,
      hall: null as Hall | null,
      movie: null as Movie | null,
      seatsArray: null as SeatsTable | null,
      chosenSeats: new Set<string>(),
      bookTickets: false,
      ticketPrices: 0,
    };
  },
  props: {
    id: {
      type: [Number, String],
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
      const response = await getOneSeance(this.id);
      this.seance = response.data;
    },
    async fetchHall(id: string | number) {
      const response = await getHall(id);
      this.hall = response.data;
      const seatLength = response.data.seats / 10;
      if (this.seance) {
        this.seatsArray = genSeatsTable(seatLength, this.seance.taken_seats);
      }
    },
    async fetchMovie(movieId: string | number) {
      const response = await getOneMovie(movieId);
      this.movie = response.data;
    },
    toggleTakeSeat(seat: Seat) {
      if (!this.seatsArray) return false;
      const letter = seat.value[0];
      const indexMainArr = this.seatsArray.findIndex(
        (arr) => arr.row === letter
      );
      const indexNestArr = this.seatsArray[indexMainArr].array.findIndex(
        (arr) => {
          return arr.value === seat.value;
        }
      );

      const nestedSelectedArr =
        this.seatsArray[indexMainArr].array[indexNestArr];

      if (!nestedSelectedArr.reserved) {
        nestedSelectedArr.taken = !nestedSelectedArr.taken;
        this.addChosenSeat(seat);
      }
    },
    addChosenSeat(seat: Seat) {
      const { value } = seat;
      if (this.chosenSeats.has(value)) {
        this.chosenSeats.delete(value);
        this.chosenSeats = new Set(this.chosenSeats);
      } else {
        this.chosenSeats = new Set(this.chosenSeats.add(value));
      }
    },

    setTicketPrice(event: number) {
      this.ticketPrices = event;
    },
    removeItem(event: string) {
      // taken and reserved dont matter here, just making typescript happy
      // since this relies on emited event, its guaranteed to be in the array
      this.toggleTakeSeat({ value: event, taken: true, reserved: false });
    },
    handleSubmit(event: any) {
      console.log(event);
    },
  },
  computed: {
    seanceScreeningTime(): string {
      const screeningDate = new Date(this.seance!.datetime).toUTCString();
      return screeningDate;
    },
  },
  components: {
    MainHeader,
    ListOneMovie,
    Tags,
    ChooseSeatsSection,
    UiButton,
    SeatsPicker,
  },
});
</script>

<template>
  <div class="booking-page">
    <MainHeader />
    <div>Breadcrubs</div>
    <template v-if="movie && hall && seance">
      <ListOneMovie class="booking-page__card" show :movie="movie">
        <Tags class="tag">{{ seanceScreeningTime }}</Tags>
      </ListOneMovie>
      <main class="booking-page__seats">
        <template v-if="!bookTickets">
          <h1>Choose your seats</h1>
          <ChooseSeatsSection
            @takeSeat="toggleTakeSeat"
            :seatsArray="seatsArray"
          />
          <UiButton
            medium
            :disabled="chosenSeats.size === 0"
            @click="bookTickets = true"
            colors="brand"
            class="booking-page__seats--button"
          >
            Choose {{ chosenSeats.size }} seats
          </UiButton>
        </template>

        <template v-else>
          <h1>Choose your tickets</h1>
          <SeatsPicker
            @goBack="bookTickets = false"
            @submit="handleSubmit"
            @priceChange="setTicketPrice"
            @removeItem="removeItem"
            :tickets="chosenSeats"
          />
        </template>
      </main>
    </template>
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
      display: flex;
      margin-left: auto;
    }
  }
  @include media-sm {
    h1 {
      text-align: center;
    }

    &__card {
      padding: 16px;
      margin: 20px;
      box-shadow: 0px 24px 24px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
    }

    &__seats {
      margin-inline: 29px;
      &--button {
        display: block;
        width: 100%;
      }
    }
  }
  @include media-md {
    &__buttons-wrapper {
      display: flex;
      margin: 5rem 0;
      justify-content: space-between;
      &--button {
        display: flex;
        margin-left: 0;
      }
    }
  }
}
</style>

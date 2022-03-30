<script lang="ts">
import Vue from "vue";
import MainHeader from "@/components/MainHeader.vue";

import ListOneMovie from "@/components/chunks/ListOneMovie.vue";

import UiButton from "@/components/UI/UiButton.vue";
import Tags from "@/components/UI/Tags.vue";

import TicketsCartSection from "@/components/sections/TicketsCartSection.vue";
import BookingsFinished from "@/components/sections/BookingsFinished.vue";
import ChooseSeatsSection from "@/components/sections/ChooseSeatsSection.vue";

import { SeatsTable } from "@/helpers/genSeatsTable";
import { dateToBookingHour } from "@/helpers/timeUtils";
import { bookReservations } from "@/helpers/api/userActions";

import CheckoutBreadCrumbs from "@/components/navigation/CheckoutBreadCrumbs.vue";

import { Movie } from "@/interfaces/MovieTypes";

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

interface TicketsSubmit {
  seat: string;
  ticket: Tickets;
}

interface Tickets {
  id: number;
  name: string;
  price: number;
}

interface ChosenSeats {
  seat: string;
  ticket: {
    id: number;
    name: string;
    price: number;
  };
}

interface CheckoutData {
  movie: string;
  tickets: {
    seat: string;
    ticket_type_id: number;
  }[];
  time: string;
}

export default Vue.extend({
  data() {
    return {
      bookTickets: false,
      ticketPrices: 0,
      isCheckoutFinished: false,
      checkoutData: null as CheckoutData | null,
    };
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  created() {
    // TODO query control maybe if clearData is to be triggered?
    this.$store.dispatch("checkout/clearData");
    this.$store.dispatch("checkout/fetchSeance", +this.id);
  },
  watch: {
    seance(newSeance) {
      this.$store.dispatch("checkout/fetchMovie", newSeance.movie);
      this.$store.dispatch("checkout/fetchHall", newSeance.hall);
    },
    hall() {
      this.$store.dispatch("checkout/generateSeatsArray");
    },
  },
  methods: {
    toggleTakeSeat(seat: Seat) {
      if (!this.seatsArray) return false;
      this.$store.dispatch("checkout/toggleTakeSeat", seat);
    },
    async handleSubmit(ticketData: TicketsSubmit[]) {
      const ticketsMapped = ticketData.map((item) => {
        const obj = { seat: item.seat, ticket_type_id: item.ticket.id };
        return obj;
      });

      try {
        await bookReservations({
          seance_id: +this.id,
          tickets: [...ticketsMapped],
        });

        this.isCheckoutFinished = true;

        this.checkoutData = {
          movie: this.movie!.title,
          tickets: ticketsMapped,
          time: this.seance!.datetime,
        };
      } catch {
        this.$notify({
          type: "error",
          title: "Something went wrong",
          text: "Please try again later",
          duration: 2000,
        });
      }
    },
  },
  computed: {
    seance(): Seance | null {
      return this.$store.getters["checkout/getSeance"];
    },
    movie(): Movie | null {
      return this.$store.getters["checkout/getMovie"];
    },
    hall(): Hall | null {
      return this.$store.getters["checkout/getHall"];
    },
    chosenSeats(): ChosenSeats[] {
      return this.$store.getters["checkout/getChosenSeats"];
    },
    seatsArray(): SeatsTable {
      return this.$store.getters["checkout/getSeatsArray"];
    },
    seanceScreeningTime(): string {
      return dateToBookingHour(this.seance!.datetime);
    },
    isDataLoaded(): boolean {
      return !!(this.movie && this.hall && this.seance);
    },
  },
  components: {
    MainHeader,
    ListOneMovie,
    Tags,
    ChooseSeatsSection,
    UiButton,
    TicketsCartSection,
    BookingsFinished,
    CheckoutBreadCrumbs,
  },
});
</script>

<template>
  <div class="booking-page">
    <MainHeader />
    <div v-if="!isCheckoutFinished">
      <checkout-bread-crumbs :isOnBookTickets="bookTickets" />
      <template v-if="isDataLoaded && !isCheckoutFinished">
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
              :disabled="chosenSeats.length === 0"
              @click="bookTickets = true"
              colors="brand"
              class="booking-page__seats--button"
            >
              Choose {{ chosenSeats.length }} seats
            </UiButton>
          </template>

          <template v-else>
            <h1>Choose your tickets</h1>
            <TicketsCartSection
              @goBack="bookTickets = false"
              @submit="handleSubmit"
            />
          </template>
        </main>
      </template>
    </div>
    <template v-else-if="isCheckoutFinished">
      <h1 class="font--header booking-page--headers">Hell Yeah</h1>
      <h1 class="font--header booking-page--headers">
        You booked {{ chosenSeats.length }} tickets
      </h1>
      <BookingsFinished :checkoutData="checkoutData" />
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

  &--headers {
    font-size: 48px;
    margin-bottom: 0;
    &:last-of-type {
      margin: 0;
      padding: 0;
      color: #f47073;
    }
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

<script lang="ts">
import Vue, { PropType } from "vue";
import { dateToBookingHour } from "@/helpers/timeUtils";
import { getTicketRowSeat, ticketTypes } from "@/helpers/tickets";
import UiButton from "../UI/UiButton.vue";

interface CheckoutData {
  movie: string;
  tickets: {
    seat: string;
    ticket_type_id: number;
  }[];
  time: string;
}

export default Vue.extend({
  props: {
    checkoutData: {
      type: Object as PropType<CheckoutData>,
      required: true,
    },
  },
  methods: {
    formatSeat(seat: string) {
      return getTicketRowSeat(seat);
    },
    getTicketType(id: number) {
      return ticketTypes.filter((item: any) => item.id === id);
    },
    getTicketString(id: number) {
      const type = this.getTicketType(id)[0];
      return `${type.name} -- $${type.price} `;
    },
  },
  computed: {
    formatTime(): string {
      return dateToBookingHour(this.checkoutData.time);
    },
  },
  components: { UiButton },
});
</script>

<template>
  <main class="bookings-finished">
    <section
      class="bookings-finished__wrapper"
      v-for="(ticket, index) in checkoutData.tickets"
      :key="index"
    >
      <div>
        <h3 class="font--label">Movie</h3>
        <p>{{ checkoutData.movie }}</p>
      </div>
      <div>
        <h3 class="font--label">Seat</h3>
        <p class="bookings-finished--seat">
          Row:
          <b>{{ formatSeat(ticket.seat).row }}</b
          >, Seat
          <b>{{ formatSeat(ticket.seat).seat }}</b>
        </p>
      </div>
      <div>
        <h3 class="font--label">Time</h3>
        <p>{{ formatTime }}</p>
      </div>
      <div>
        <h3 class="font--label">Ticket Type</h3>
        <p>{{ getTicketString(ticket.ticket_type_id) }}</p>
      </div>
    </section>
    <section class="bookings-finished__nav">
      <router-link to="/">
        <UiButton large colors="brand">Go to homepage</UiButton>
      </router-link>
    </section>
  </main>
</template>

<style scoped lang="scss">
.bookings-finished {
  margin-top: 64px;
  &__wrapper {
    display: flex;
    gap: 32px;
  }

  &--seat {
    color: #343541;
    width: max-content;
  }

  &__nav {
    display: flex;
    margin-top: 64px;
    a {
      margin-left: auto;
    }
  }

  @include media-sm {
    margin: 64px 27px;
    h3 {
      margin: 0;
    }

    p {
      margin-top: 8px;
    }

    &__wrapper {
      flex-flow: column;
      gap: 12px;
      margin-bottom: 48px;
    }

    &__nav {
      display: flex;
      margin-top: 64px;
      a,
      button {
        width: min(100%, 500px);
      }

      a {
        margin-inline: auto;
      }
    }
  }
}
</style>

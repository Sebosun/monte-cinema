<script lang="ts">
import Vue, { PropType } from "vue";
import { dateToBookingHour } from "@/helpers/timeUtils";
import { getTicketRowSeat, ticketTypes } from "@/helpers/tickets";

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
});
</script>

<template>
  <main class="bookings-finished">
    <div
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
        <div class="bookings-finished--seat">
          Row:
          <b>{{ formatSeat(ticket.seat).row }}</b
          >, Seat
          <b>{{ formatSeat(ticket.seat).seat }}</b>
        </div>
      </div>
      <div>
        <h3 class="font--label">Time</h3>
        <p>{{ formatTime }}</p>
      </div>
      <div>
        <h3 class="font--label">Ticket Type</h3>
        {{ getTicketString(ticket.ticket_type_id) }}
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.bookings-finished {
  &__wrapper {
    display: flex;
    gap: 32px;
  }

  &--seat {
    color: #343541;
    width: max-content;
  }
}
</style>

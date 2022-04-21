<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api";
import { defaultClient } from "@/helpers/api/axiosClient";

export default defineComponent({
  setup() {
    const data: any = ref([]);

    defaultClient
      .get("/reservations?user_email=admin@monterail.com&page=5&per_page=10")
      .then((item) => {
        data.value = item;
      });

    return {};
  },
});
</script>

<template>
  <section>
    <div>
      <h3>Upcoming</h3>
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
      <h3>Past</h3>
    </div>
  </section>
</template>

<style></style>

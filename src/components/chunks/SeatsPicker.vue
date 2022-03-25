<script lang="ts">
import Vue, { PropType } from "vue";

const dummySet = new Set<string>();

type SetType = typeof dummySet;

export default Vue.extend({
  props: {
    tickets: {
      type: Set as PropType<SetType>,
      required: true,
    },
  },
  methods: {
    getTicketRowSeat(ticket: string) {
      const row = ticket[0];
      const seat = ticket.split(row)[1];
      return { row, seat };
    },
  },
});
</script>

<template>
  <div class="seats-picker">
    <div v-for="(ticket, index) in tickets" :key="index">
      <div class="seats-picker__wrapper">
        <div>
          <h3 class="font--label">Seat</h3>
          <div class="seats-picker--seat">
            Row:
            <b>{{ getTicketRowSeat(ticket).row }}</b
            >, Seat
            <b>{{ getTicketRowSeat(ticket).seat }}</b>
          </div>
        </div>
        <div>
          <h3 class="font--label">Seat</h3>
          <div class="seats-picker--seat">
            Row:
            <b>{{ getTicketRowSeat(ticket).row }}</b
            >, Seat
            <b>{{ getTicketRowSeat(ticket).seat }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.seats-picker {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  &__wrapper {
    display: flex;
    gap: 20px;
  }

  &--seat {
    color: #343541;
    padding: 20px;
    width: max-content;
    background-color: var(--color-rose);
  }
}
</style>

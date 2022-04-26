<script lang="ts">
import Vue, { PropType } from "vue";

import { ReservationModel } from "@/interfaces/ReservationsTypes";
import { dateToBookingHour } from "@/helpers/timeUtils";
import UiButton from "../UI/UiButton.vue";

export default Vue.extend({
  props: {
    reservations: {
      type: Object as PropType<ReservationModel>,
      required: true,
    },
    enableButtons: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getRow(ticket: string) {
      return ticket[0];
    },
    getSeat(ticket: string) {
      return ticket.split(this.getRow(ticket))[1];
    },
  },
  computed: {
    formatTime(): string {
      return dateToBookingHour(this.reservations.seance_datetime);
    },
  },
  components: { UiButton },
});
</script>

<template>
  <div class="reservations-table">
    <section
      class="reservations-table__wrapper"
      v-for="(ticket, index) in reservations.tickets"
      :key="index"
    >
      <div class="reservations-table__ticket-info">
        <div class="reservations-table__movie">
          <h3 class="font--label">Movie</h3>
          <p>{{ reservations.movie_title }}</p>
        </div>
        <div class="reservations-table__seat">
          <h3 class="font--label">Seat</h3>
          <p class="reservations-table--seat">
            Row:
            <b>{{ getRow(ticket.seat) }}</b
            >, Seat
            <b>{{ getSeat(ticket.seat) }}</b>
          </p>
        </div>
        <div class="reservations-table__time">
          <h3 class="font--label">Time</h3>
          <p>{{ formatTime }}</p>
        </div>
        <div class="reservations-table__ticket">
          <h3 class="font--label">Ticket Type</h3>
          <p>${{ ticket.price }} {{ ticket.type }}</p>
        </div>
      </div>
      <template v-if="enableButtons">
        <div class="reservations-table__actions-status">
          <div
            :class="[
              'reservations-table__status',
              {
                'reservations-table--confirmed':
                  reservations.status.name.toLowerCase() === 'confirmed',
              },
            ]"
          >
            <h3>{{ reservations.status.name }}</h3>
          </div>
          <div class="reservations-table__remove">
            <UiButton
              colors="primary"
              transparent
              @click="$emit('remove', ticket)"
              medium
              >Remove</UiButton
            >
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped lang="scss">
.reservations-table {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  @include media-sm {
    padding-inline: 27px;
    max-width: var(--max-mobile-width);
    margin-inline: auto;

    h3 {
      margin: 0;
    }

    p {
      margin-top: 8px;
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 60% 1fr;

    @include media-sm {
      flex-flow: column;
      grid-gap: 12px;
      margin-bottom: 48px;
    }
    @include media-md {
      grid-template-columns: 1fr minmax(10%, 30%);
    }
  }

  &__ticket-info {
    display: grid;
    grid-gap: 10px;
    @include media-md {
      min-width: 450px;
      grid-template-columns: repeat(4, 1fr);
    }
    @include media-lg {
      min-width: 850px;
    }
  }

  &--seat {
    color: #343541;
  }

  &__actions-status {
    width: 100%;
    display: flex;
    align-items: center;
    flex: 1;
    @include media-sm {
      flex-flow: column;
      justify-content: space-evenly;
    }
  }

  &__status {
    @include media-md {
      margin-left: auto;
    }
  }

  &__status h3 {
    padding: 8px 16px;
    background: #f7f7f7;
    color: #85868d;
    border-radius: 24px;
    font-size: 14px;
    font-weight: bold;
    max-width: fit-content;
  }

  &--confirmed h3 {
    color: var(--color-red);
    background: var(--color-rose);
  }

  &__remove {
    @include media-md {
      margin-left: auto;
    }
  }
}
</style>

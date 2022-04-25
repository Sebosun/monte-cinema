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
  --table-min: 10px;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  &__wrapper {
    display: grid;
    @include media-md {
      grid-template-columns: 1fr minmax(10%, 30%);
    }
  }

  &__ticket-info {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    @include media-md {
      min-width: 450px;
    }
    @include media-lg {
      min-width: 850px;
    }
  }

  &--seat {
    color: #343541;
    min-width: var(--table-min);
  }

  &--movie {
    min-width: var(--table-min);
  }
  &--time {
    min-width: var(--table-min);
  }
  &--ticket {
    min-width: var(--table-min);
  }

  &__actions-status {
    width: 100%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    flex: 1;
  }

  &__status {
    margin-left: auto;
    h3 {
      padding: 8px 16px;
      background: #f7f7f7;
      color: #85868d;
      border-radius: 24px;
      font-size: 14px;
      font-weight: bold;
      max-width: fit-content;
    }
  }
  &--confirmed h3 {
    color: var(--color-red);
    background: var(--color-rose);
  }

  &__remove {
    margin-left: auto;
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

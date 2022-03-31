<script lang="ts">
import Vue from "vue";
import UiButton from "@/components/UI/UiButton.vue";
import { getTicketRowSeat, ticketTypes } from "@/helpers/tickets";

interface CombinedArray {
  seat: string;
  ticket: {
    id: number;
    name: string;
    price: number;
  };
}

export default Vue.extend({
  components: { UiButton },
  data() {
    return {
      ticketTypes: ticketTypes,
      termsAndConditions: false,
    };
  },
  methods: {
    getTicketRowSeat(ticket: string) {
      return getTicketRowSeat(ticket);
    },
    removeSeat(index: number, seat: string) {
      this.$store.dispatch("checkout/toggleTakeSeat", { value: seat, index });
    },
    finishBooking() {
      if (this.termsAndConditions) {
        this.$emit("submit", this.chosenSeats);
      }
    },
    updateTicketType(ticketId: string, index: number) {
      this.$store.commit("checkout/updateTicketType", {
        ticketId,
        index,
      });
    },
  },
  computed: {
    chosenSeats(): CombinedArray[] {
      return this.$store.getters["checkout/getChosenSeats"];
    },
    totalTicketPrice(): number {
      return this.$store.getters["checkout/getTotalPrice"];
    },
    isProceedButtonDisabled(): boolean {
      return !this.termsAndConditions || this.chosenSeats.length === 0;
    },
  },
});
</script>

<template>
  <div class="seats-picker">
    <div v-for="(chosenSeat, index) in chosenSeats" :key="index">
      <div class="seats-picker__wrapper">
        <div>
          <h3 class="font--label">Seat</h3>
          <div class="seats-picker--seat">
            Row:
            <b>{{ getTicketRowSeat(chosenSeat.seat).row }}</b
            >, Seat
            <b>{{ getTicketRowSeat(chosenSeat.seat).seat }}</b>
          </div>
        </div>
        <div class="seats-picker__tickets">
          <h3 class="font--label">Ticket type</h3>
          <select
            class="input"
            name="ticket-types"
            :value="chosenSeat.ticket.id"
            @change="updateTicketType($event.target.value, index)"
          >
            <option
              v-for="ticketType in ticketTypes"
              :value="ticketType.id"
              :key="ticketType.id"
            >
              {{ ticketType.name }} -- ${{ ticketType.price }}
            </option>
          </select>
        </div>
        <UiButton
          @click="removeSeat(index, chosenSeat.seat)"
          transparent
          colors="primary"
          large
          >Remove</UiButton
        >
      </div>
    </div>
    <div class="seats-picker__privacy">
      <input
        v-model="termsAndConditions"
        name="terms and conditions"
        type="checkbox"
      />
      <label for="terms and conditions"
        >I accept
        <router-link to=""> <u> Terms & Conditions</u> </router-link></label
      >
    </div>

    <div class="seats-picker__buttons-wrapper">
      <UiButton
        medium
        transparent
        colors="primary"
        class="seats-picker__buttons-wrapper--button"
        @click="$emit('goBack')"
      >
        Back
      </UiButton>

      <UiButton
        medium
        colors="brand"
        class="seats-picker__buttons-wrapper--button"
        @click="finishBooking"
        :disabled="isProceedButtonDisabled"
      >
        Book tickets - ${{ totalTicketPrice }}
      </UiButton>
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

  .input {
    @include input;
  }

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

  &__privacy {
    margin: 50px 0;

    label {
      margin-left: 20px;
    }
  }

  &__tickets {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }

  @include media-sm {
    &__wrapper {
      flex-flow: column;
      margin-inline: auto;
      max-width: 350px;
      margin-bottom: 64px;
    }

    &__wrapper * {
      width: 100%;
    }

    &__seats {
      margin-inline: 29px;
      display: flex;
      flex-flow: column &--button {
        display: block;
        width: 100%;
      }
    }

    &__privacy {
      max-width: 350px;
      margin-inline: auto;
    }

    &__buttons-wrapper {
      display: flex;
      flex-flow: column-reverse;
      gap: 20px;
      max-width: 350px;
      margin-inline: auto;
    }
  }

  @include media-md {
    &__wrapper .button {
      margin-left: auto;
      align-self: end;
    }
    &__seats {
      margin-inline: 29px;
      &--button {
        display: block;
        width: 100%;
      }
    }
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

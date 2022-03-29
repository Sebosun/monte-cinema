<script lang="ts">
import Vue, { PropType } from "vue";
import UiButton from "@/components/UI/UiButton.vue";
import { getTicketRowSeat, ticketTypes } from "@/helpers/tickets";

const dummySet = new Set<string>();

type SetType = typeof dummySet;

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
      chosenTicketsAndTicketTypes: [] as CombinedArray[],
      termsAndConditions: false,
    };
  },
  props: {
    tickets: {
      type: Set as PropType<SetType>,
      required: true,
    },
  },
  mounted() {
    const chosenTicketsArray: string[] = Array.from(this.tickets);

    this.chosenTicketsAndTicketTypes = chosenTicketsArray.map((item) => {
      return { seat: item, ticket: { id: 1, name: "Adult", price: 20.0 } };
    });
  },
  methods: {
    getTicketRowSeat(ticket: string) {
      return getTicketRowSeat(ticket);
    },
    removeSeat(index: number, seat: string) {
      this.chosenTicketsAndTicketTypes.splice(index, 1);
      this.$emit("removeItem", seat);
    },
    finishBooking() {
      if (this.termsAndConditions) {
        this.$emit("submit", this.chosenTicketsAndTicketTypes);
      }
    },
  },
  computed: {
    totalTicketPrice(): number {
      const totalPrice = this.chosenTicketsAndTicketTypes.reduce(
        (acc, cur) => acc + cur.ticket.price,
        0
      );

      this.$emit("priceChange", totalPrice);
      return totalPrice;
    },
  },
});
</script>

<template>
  <div class="seats-picker">
    <div v-for="(item, index) in chosenTicketsAndTicketTypes" :key="index">
      <div class="seats-picker__wrapper">
        <div>
          <h3 class="font--label">Seat</h3>
          <div class="seats-picker--seat">
            Row:
            <b>{{ getTicketRowSeat(item.seat).row }}</b
            >, Seat
            <b>{{ getTicketRowSeat(item.seat).seat }}</b>
          </div>
        </div>
        <div class="seats-picker__tickets">
          <h3 class="font--label">Ticket type</h3>
          <select
            class="input"
            name="ticket-types"
            key="item.id"
            v-model="item.ticket"
          >
            <option
              v-for="ticketType in ticketTypes"
              :value="ticketType"
              :key="ticketType.id"
            >
              {{ ticketType.name }} -- ${{ ticketType.price }}
            </option>
          </select>
        </div>
        <UiButton
          @click="removeSeat(index, item.seat)"
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
        :disabled="!termsAndConditions"
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

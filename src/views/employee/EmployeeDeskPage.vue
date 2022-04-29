<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";

import MainHeader from "@/components/MainHeader.vue";
import ReservationTable from "@/components/chunks/ReservationTable.vue";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation.vue";

import { Ticket, ReservationModel } from "@/interfaces/ReservationsTypes";
import UiButton from "@/components/UI/UiButton.vue";

import { defaultClient } from "@/helpers/api/axiosClient";
import { getReservations } from "@/helpers/api/employeeActions";
import debounce from "lodash.debounce";

/* eslint-disable */
enum ReservationStatus {
  Booked = 1,
  Confirmed,
  Cancelled,
}

/* eslint-enable */
export default defineComponent({
  components: { MainHeader, BreadcrumbNavigation, ReservationTable, UiButton },
  setup() {
    const reservationsList = ref<ReservationModel[]>([]);
    const search = ref("");
    const page = ref(2);

    defaultClient
      .get("/reservations?page=2")
      .then(
        ({ data }: { data: ReservationModel[] }) =>
          (reservationsList.value = data)
      );

    const activeReservations = computed(() => {
      return reservationsList.value.filter(
        (reservation) =>
          reservation.status.id === ReservationStatus.Booked ||
          reservation.status.id === ReservationStatus.Confirmed
      );
    });

    const fetchUserWithEmail = debounce(async () => {
      const { data }: { data: ReservationModel[] } = await getReservations({
        user_email: search.value,
        page: page.value,
      });
      reservationsList.value = data;
    }, 1000);

    watch(search, () => {
      fetchUserWithEmail();
    });

    const handleRemoveTicket = (ticket: Ticket) => {
      // no endpoint for this action
      console.log(ticket);
    };

    const handleConfirmTicket = (ticket: Ticket) => {
      // no endpoint for this action
      console.log(ticket);
    };

    const moviesSearchFiltered = computed(() => {
      let re = new RegExp(search.value, "i");
      return activeReservations.value.filter((reservation) =>
        reservation.user_email.match(re)
      );
    });

    return {
      search,
      reservationsList,
      moviesSearchFiltered,
      activeReservations,
      handleRemoveTicket,
      handleConfirmTicket,
      fetchUserWithEmail,
    };
  },
});
</script>

<template>
  <div class="desk-page">
    <MainHeader />
    <BreadcrumbNavigation>Desk 1</BreadcrumbNavigation>
    <main class="desk-page__main">
      <section class="desk-page__top">
        <h1 class="font--header">Do your work</h1>
        <router-link to="/desk/create-a-reservation">
          <UiButton colors="brand" small>Create a reservation</UiButton>
        </router-link>
      </section>
      <section class="desk-page__search">
        <label class="label font--label" for="search">Search by email</label>
        <input
          placeholder="What are you looking for?"
          v-model="search"
          class="input"
          name="search"
          type="text"
        />
      </section>
      <section v-for="reservation in activeReservations" :key="reservation.id">
        <ReservationTable
          @remove="handleRemoveTicket"
          @confirm="handleConfirmTicket"
          :reservations="reservation"
          enableButtons
          employee
        />
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: 48px;
}
.desk-page {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      margin-left: auto;
    }
  }
  &__main {
    margin-bottom: 128px;
  }
  &__search {
    display: grid;
    grid-gap: 12px;
    margin-bottom: 64px;
    max-width: 800px;
    input {
      @include input;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";

import MainHeader from "@/components/MainHeader.vue";
import ReservationTable from "@/components/chunks/ReservationTable.vue";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation.vue";

import { defaultClient } from "@/helpers/api/axiosClient";
import { Ticket, ReservationModel } from "@/interfaces/ReservationsTypes";

/* eslint-disable */
enum ReservationStatus {
  Booked = 1,
  Confirmed,
  Cancelled,
}

/* eslint-enable */
export default defineComponent({
  components: { MainHeader, BreadcrumbNavigation, ReservationTable },
  setup() {
    const reservationsList = ref<ReservationModel[]>([]);
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

    const handleRemoveTicket = (ticket: Ticket) => {
      // no endpoint for this action
      console.log(ticket);
    };

    const handleConfirmTicket = (ticket: Ticket) => {
      // no endpoint for this action

      console.log(ticket);
    };
    return {
      reservationsList,
      activeReservations,
      handleRemoveTicket,
      handleConfirmTicket,
    };
  },
});
</script>

<template>
  <div class="desk-page">
    <MainHeader />
    <BreadcrumbNavigation>Desk 1</BreadcrumbNavigation>
    <main class="desk-page__main">
      <h1>Do your work</h1>
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
  &__main {
    margin-bottom: 128px;
  }
}
</style>

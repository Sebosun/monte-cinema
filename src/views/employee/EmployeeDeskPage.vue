<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import { defineComponent, ref } from "@vue/composition-api";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation.vue";
import { defaultClient } from "@/helpers/api/axiosClient";
import ReservationTable from "@/components/chunks/ReservationTable.vue";
import { ReservationModel } from "@/interfaces/ReservationsTypes";
export default defineComponent({
  components: { MainHeader, BreadcrumbNavigation, ReservationTable },
  setup() {
    const reservationsList = ref<ReservationModel>();
    defaultClient
      .get("/reservations")
      .then(
        ({ data }: { data: ReservationModel }) =>
          (reservationsList.value = data)
      );
    return { reservationsList };
  },
});
</script>

<template>
  <div>
    <MainHeader />
    <BreadcrumbNavigation>Desk 1</BreadcrumbNavigation>
    <main>
      <h1>Do your work</h1>
      <section v-for="reservation in reservationsList" :key="reservation.id">
        <ReservationTable :reservations="reservation" enableButtons employee />
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: 48px;
}
</style>

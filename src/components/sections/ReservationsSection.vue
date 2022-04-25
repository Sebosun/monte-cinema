<script lang="ts">
import { ref, computed, defineComponent } from "@vue/composition-api";
import { defaultClient } from "@/helpers/api/axiosClient";
import { ReservationModel, Ticket } from "@/interfaces/ReservationsTypes";
import ReservationTable from "../chunks/ReservationTable.vue";

export default defineComponent({
  metaInfo: {
    title: "Reservations",
  },
  setup() {
    const fetchData = ref<ReservationModel[]>([]);
    defaultClient
      .get("/reservations?user_email=admin@monterail.com&page=5&per_page=10")
      .then(({ data }: { data: ReservationModel[] }) => {
        fetchData.value = data;
      });
    const activeReservations = computed(() => {
      return fetchData.value.filter(
        (reservation) => reservation.status.id != 3
      );
    });
    const inActiveReservations = computed(() => {
      return fetchData.value.filter(
        (reservation) => reservation.status.id === 3
      );
    });

    const handleRemoveTicket = (ticket: Ticket) => {
      // seems like there isn't an endpoint on the api to remove tickets so leaving it as it is
      console.log(ticket);
    };

    return {
      fetchData,
      activeReservations,
      inActiveReservations,
      handleRemoveTicket,
    };
  },
  components: { ReservationTable },
});
</script>

<template>
  <div class="reservation">
    <h3>Upcoming</h3>
    <div v-for="reservation in activeReservations" :key="reservation.id">
      <ReservationTable
        @remove="handleRemoveTicket"
        :enableButtons="true"
        :reservations="reservation"
      />
    </div>
    <h3>Past</h3>
    <div v-for="reservation in inActiveReservations" :key="reservation.id">
      <ReservationTable :enableButtons="false" :reservations="reservation" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.reservation {
  border-radius: 24px;

  h3 {
    margin-inline: 24px;
    font-family: "Eczar";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 102%;
  }

  @include media-sm {
    margin-inline: auto;
    max-width: 475px;
  }

  @include media-md {
    box-shadow: 0px 4px 22px 0px #34354126;
    margin-top: 64px;
    margin-bottom: 128px;
    padding: 64px;
  }
}
</style>

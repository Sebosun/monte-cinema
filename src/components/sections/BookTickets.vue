<script lang="ts">
import Vue from "vue";
import ListOneMovie from "../chunks/ListOneMovie.vue";

export default Vue.extend({
  components: { ListOneMovie },
});
</script>

<template>
  <div class="book-tickets">
    <MainHeader />
    <div>Breadcrubs</div>
    <div>
      <ListOneMovie show :movie="movie">
        <Tags class="tag">{{ new Date(seance.datetime).toUTCString() }}</Tags>
      </ListOneMovie>
      <main class="booking-page__seats">
        <h1>Choose your seats</h1>
        <ChooseSeatsSection
          @takeSeat="toggleTakeSeat"
          :seatsArray="seatsArray"
        />
        <UiButton
          medium
          :disabled="chosenSeats.size === 0"
          colors="brand"
          class="booking-page__seats--button"
        >
          Choose {{ chosenSeats.size }} seats
        </UiButton>
      </main>
    </div>
  </div>
</template>

<style scoped></style>

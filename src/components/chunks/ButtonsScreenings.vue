<template>
  <div>
    <router-link
      v-for="screening in screeningsWithDates"
      :key="screening.id"
      :to="{ name: 'Booking', params: { id: screening.id } }"
    >
      <ui-button transparent colors="brand">
        {{ getScreeningHour(screening.datetime) }}
      </ui-button>
    </router-link>
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton.vue";
export default {
  props: {
    screeningsWithDates: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getScreeningHour(date) {
      const options = {
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("pl-PL", options).format(
        date
      );
      return formattedDate;
    },
  },
  components: { UiButton },
};
</script>

<style></style>

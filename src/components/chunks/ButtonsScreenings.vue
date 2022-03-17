<template>
  <div>
    <ui-button
      v-for="screening in screeningsWithDates"
      :key="screening.id"
      empty
      colors="brand"
      >{{ getScreeningHour(screening.datetime) }}</ui-button
    >
  </div>
</template>

<script>
import UiButton from "../UI/UiButton.vue";
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

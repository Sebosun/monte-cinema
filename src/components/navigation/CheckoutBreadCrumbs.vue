<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isOnBookTickets: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<template>
  <nav class="checkout-breadcrumbs">
    <ul class="checkout-breadcrumbs__list">
      <li
        class="checkout-breadcrumbs__item"
        :class="{ 'active-list': !isOnBookTickets }"
      >
        <span class="checkout-breadcrumbs__item--number">1</span>
        <span class="checkout-breadcrumbs__item--text">Choose Seats</span>
      </li>
      <li
        class="checkout-breadcrumbs__item"
        :class="{ 'active-list': isOnBookTickets }"
      >
        <span class="checkout-breadcrumbs__item--number">2</span>
        <span class="checkout-breadcrumbs__item--text">Book tickets</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
li {
  list-style-type: none;
}

ul {
  margin: 0;
  padding: 0;
}

.checkout-breadcrumbs {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;

  background: var(--color-rose);
  display: flex;
  justify-content: center;

  &__list {
    display: flex;
    gap: 16px;
    min-width: 118px;
    margin: 12px;
  }

  &__item {
    padding: 12px;
    border: 2px solid var(--color-primary);

    border-radius: 999px;
    &--number {
      margin-right: 8px;
      padding: 4px 10px;
      border-radius: 999px;
      color: var(--color-rose);
      background: var(--color-primary);
    }
  }
}

/* put here cause specificity */
.active-list {
  border: 2px solid var(--color-red);
  color: var(--color-red);
  span {
    color: var(--color-red);
    &:first-of-type {
      color: var(--color-rose);
      background-color: var(--color-red);
    }
  }
}
</style>

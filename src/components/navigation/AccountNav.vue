<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: { MainHeader },
  props: {
    activePage: {
      type: String,
      required: true,
    },
  },
});
</script>
<template>
  <nav class="account-nav">
    <ul class="account-nav__wrapper">
      <li :class="{ active: activePage === 'details' }">
        <button
          @click="$emit('changeActivePage', 'details')"
          class="account-nav--button"
        >
          Personal Details
        </button>
      </li>
      <li :class="{ active: activePage === 'reservations' }">
        <button
          @click="$emit('changeActivePage', 'reservations')"
          class="account-nav--button"
        >
          Reservations
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.account-nav {
  ul {
    font-size: 48px;

    margin: 0;
    padding: 0;

    display: flex;
    gap: 10px;
    list-style: none;

    color: #aeaeb3;
    @include media-sm {
      justify-content: center;
      margin-inline: 10px;
    }
  }

  ul li {
    font-family: Eczar;
    font-size: 48px;
    font-weight: 600;
    line-height: 49px;
    letter-spacing: -0.01em;
    text-align: left;
    @include media-sm {
      margin: 0;
      padding: 0;
      font-size: 24px;
      text-align: center;
    }
  }

  &--button {
    color: inherit;
    border: 0;
    background-color: inherit;
    &:hover {
      cursor: pointer;
    }
    @include media-sm {
      margin: 0;
      padding: 0;
    }
  }

  .active {
    color: black;
  }
}
</style>

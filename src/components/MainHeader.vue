<template>
  <header class="header">
    <monte-cinema-logo />
    <button class="hamburgerButton">
      <hamburger-menu />
    </button>

    <header-navigation class="header__navigation" />

    <div class="header__actions">
      <ui-button medium variation="brand empty borderless">Register</ui-button>
      <ui-button medium variation="brand">Login</ui-button>
    </div>
  </header>
</template>

<script>
/* TODO Hover effects */
import MonteCinemaLogo from "../assets/monte cinema.svg";
import HamburgerMenu from "../assets/navigation-menu 1.svg";
import HeaderNavigation from "./HeaderNavigation";
import UiButton from "./UI/UiButton";

export default {
  components: {
    MonteCinemaLogo,
    HamburgerMenu,
    UiButton,
    HeaderNavigation,
  },
};
</script>

<style lang="scss">
@import "../scss/_mixins.scss";

.header {
  padding: 1.375rem 0;
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburgerButton {
    border: none;
    background-color: inherit;
  }

  .hamburgerButton:hover {
    cursor: pointer;
  }

  &__navigation {
    display: none;
    max-width: 50%;
    flex-grow: 1;
  }

  &__actions {
    display: none;
  }

  @include media-md {
    & .hamburgerButton {
      display: none;
    }

    &__navigation {
      display: block;
    }

    &__actions {
      display: flex;
      flex-flow: wrap;
    }
  }
  @include media-lg {
    &__navigation {
      max-width: 35%;
    }
  }
}
</style>

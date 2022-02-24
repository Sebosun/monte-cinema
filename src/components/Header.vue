<template>
  <header class="header">
    <MonteCinemaLogo />
    <button class="hamburgerButton">
      <HamburgerMenu />
    </button>

    <header-navigation class="header__navigation" />

    <div class="header__actions">
      <Button variation="brand empty borderless">Register</Button>
      <Button variation="brand">Login</Button>
    </div>
  </header>
</template>

<script>
import MonteCinemaLogo from "../assets/monte cinema.svg";
import HamburgerMenu from "../assets/navigation-menu 1.svg";
import HeaderNavigation from "./header-navigation.vue";
import Button from "./UI/Button.vue";

export default {
  components: {
    MonteCinemaLogo,
    HamburgerMenu,
    Button,
    HeaderNavigation,
  },
};
</script>

<style lang="scss">
@import "../scss/_mixins.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.375rem 1.5rem;
  font-size: 1.125rem;

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

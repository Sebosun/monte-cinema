TODO: Get vue svg loader to load svgs
<template>
  <header class="header">
    <MonteCinemaLogo />
    <button class="hamburgerButton">
      <HamburgerMenu />
    </button>
    <nav class="header__navigation">
      <ul>
        <li>Contact Us</li>
        <li>Screenings</li>
        <li>Movies</li>
      </ul>
    </nav>
    <div class="header__actions">
      <Button variation="brand empty borderless">Register</Button>
      <Button variation="brand">Login</Button>
    </div>
  </header>
</template>

<script>
import MonteCinemaLogo from "../assets/monte cinema.svg";
import HamburgerMenu from "../assets/navigation-menu 1.svg";
import Button from "./UI/Button.vue";

export default {
  components: {
    MonteCinemaLogo,
    HamburgerMenu,
    Button,
  },
};
</script>

<style lang="scss">
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
  }
  &__actions {
    display: none;
  }

  @media (min-width: 840px) {
    & .hamburgerButton {
      display: none;
    }

    &__navigation {
      display: block;
      flex-grow: 1;
      ul {
        list-style-type: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.125rem;
      }
    }

    &__actions {
      display: flex;
      flex-flow: wrap;
    }
  }
}
</style>

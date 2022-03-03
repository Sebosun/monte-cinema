<script>
import MonteCinemaLogo from "../assets/monte cinema.svg";
import HamburgerMenu from "../assets/navigation-menu 1.svg";
import HeaderNavigation from "../components/HeaderNavigation.vue";
import UiButton from "./UI/UiButton.vue";
export default {
  data() {
    return {
      isMobileMenuVisible: true,
    };
  },
  components: { MonteCinemaLogo, HeaderNavigation, UiButton, HamburgerMenu },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    },
  },
};
</script>
<template>
  <header class="header">
    <div class="header__small">
      <router-link class="header__logo" to="/">
        <monte-cinema-logo />
      </router-link>

      <button @click="toggleMobileMenu" class="hamburgerButton">
        <hamburger-menu />
      </button>
    </div>

    <div v-show="isMobileMenuVisible" class="header__navigation--mobile">
      <header-navigation />
      <div>
        <router-link :to="{ name: 'Register' }">
          <ui-button small borderless empty colors="brand">
            Register
          </ui-button>
        </router-link>
        <ui-button small colors="brand">
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </ui-button>
      </div>
    </div>

    <header-navigation class="header__navigation" />

    <div class="header__actions">
      <ui-button medium borderless empty colors="brand">
        <router-link :to="{ name: 'Register' }"> Register </router-link>
      </ui-button>
      <ui-button medium colors="brand">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </ui-button>
    </div>
  </header>
</template>

<style lang="scss">
@import "../scss/_mixins.scss";

.header {
  font-size: 1.125rem;

  &__small {
    display: flex;
    justify-content: space-between;
  }

  a {
    margin: 2.0625rem 0 2.0625rem 1.5rem;
  }

  .hamburgerButton {
    border: none;
    background-color: inherit;
    margin-right: 1.5rem;
  }

  .hamburgerButton:hover {
    cursor: pointer;
  }

  &__navigation {
    max-width: 100%;
    flex-grow: 1;
  }

  &__navigation--mobile {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f7f7;
    padding: 10px 10px 0 0;
    font-size: 14px;
    a {
      margin: 0;
      padding: 0;
    }
    button {
      background-color: #f7f7f7;
    }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.8125rem 0;

    a {
      margin: 0;
    }

    & .hamburgerButton {
      display: none;
    }

    &__navigation {
      display: block;
    }

    &__navigation--mobile {
      display: none;
      flex-grow: 1;
    }

    &__actions {
      display: flex;
      flex-flow: wrap;
    }
  }
  @include media-lg {
    &__navigation {
      max-width: 500px;
    }
  }
}
</style>

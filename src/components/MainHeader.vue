<script>
import MonteCinemaLogo from "@/assets/monte cinema.svg";
import HamburgerIcon from "@/assets/navigation-menu 1.svg";
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import MobileNavigation from "@/components/chunks/MobileNavigation.vue";
import HeaderActions from "./chunks/HeaderActions.vue";

export default {
  data() {
    return {
      isMobileMenuVisible: false,
    };
  },
  components: {
    MonteCinemaLogo,
    HeaderNavigation,
    HamburgerIcon,
    MobileNavigation,
    HeaderActions,
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
//TODO split into separate components at some point
</script>
<template>
  <header class="main-header">
    <div class="main-header__mobile">
      <div class="main-header__mobile--top">
        <router-link class="main-header__logo" to="/">
          <MonteCinemaLogo />
        </router-link>

        <button @click="toggleMobileMenu" class="hamburgerButton">
          <HamburgerIcon />
        </button>
      </div>

      <MobileNavigation
        class="main-header__navigation"
        v-if="isMobileMenuVisible"
      />
    </div>

    <div class="main-header__desktop">
      <router-link class="main-header__logo" to="/">
        <MonteCinemaLogo />
      </router-link>
      <HeaderNavigation class="main-header__nav" />
      <HeaderActions v-if="!isLoggedIn" class="main-header__actions" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  font-size: 1.125rem;

  &__mobile--top {
    display: flex;
    margin: 2.0625rem 1.5rem 2.0625rem 1.5rem;
  }

  &__desktop {
    display: none;
  }

  .hamburgerButton {
    border: none;
    background-color: inherit;
    margin-left: auto;
  }

  .hamburgerButton:hover {
    cursor: pointer;
  }

  @include media-md {
    &__start {
      margin: 0;
    }

    a {
      margin: 0;
    }

    &__mobile {
      display: none;
      flex-grow: 1;
    }

    &__desktop {
      padding: 1.8125rem 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }

    &__nav {
      flex: 1;
      max-width: 500px;
    }
  }
}
</style>

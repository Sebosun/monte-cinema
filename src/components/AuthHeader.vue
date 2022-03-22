<script>
import MonteCinemaLogo from "@/assets/monte cinema.svg";
import HamburgerIcon from "@/assets/navigation-menu 1.svg";
export default {
  components: { MonteCinemaLogo, HamburgerIcon },
};
</script>

<template>
  <header class="auth-header">
    <router-link to="/">
      <monte-cinema-logo />
    </router-link>

    <div class="auth-header__developed">
      Developed with <span>♥</span> by Monterail
    </div>

    <button class="hamburger">
      <HamburgerIcon />
    </button>
  </header>
</template>
<style lang="scss" scoped>
.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 29px 1.5rem;

  span {
    color: var(--color-brand);
  }

  &__developed {
    text-transform: uppercase;
    font-size: 1rem;
    font-family: Roboto Mono;
    font-weight: 500;
    line-height: 21px;
  }

  @include media-sm {
    &__developed {
      display: none;
    }
  }

  .hamburger {
    background-color: inherit;
    border: none;
  }

  @include media-md {
    padding: 29px 0;
    .hamburger {
      display: none;
    }
  }
}
</style>

<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'Movies' }">
          <div class="nav__hover">Movies</div></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Screenings' }">
          <div class="nav__hover">Screenings</div></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Contact' }">
          <div class="nav__hover">Contact Us</div></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.router-link-active {
  .nav__hover {
    cursor: pointer;
    font-weight: 700;
    color: var(--color-primary);

    &::before {
      opacity: 1;
    }
  }
}

ul {
  padding: 0;
  list-style-type: none;
}

@include media-sm {
  nav {
    background-color: #f7f7f7;
  }
  ul {
    display: flex;
    gap: 20px;
    padding: 20px;
    margin: 0;
    padding-left: 1.5rem;
  }
}

a {
  text-decoration: none;
  color: inherit;
}

@include media-md {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: stretch;
    gap: 0.125rem;
  }
  .nav__hover {
    position: relative;
    transition: color 300ms ease-in-out;
    color: var(--color-secondary);
    justify-self: stretch;
    text-align: center;

    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 5px;
      width: 100%;
      left: 0;
      right: 0;
      bottom: -50px;
      background: var(--color-brand);
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    }

    &:hover {
      cursor: pointer;
      font-weight: 700;
      color: var(--color-primary);

      &::before {
        opacity: 1;
      }
    }
  }
}
</style>

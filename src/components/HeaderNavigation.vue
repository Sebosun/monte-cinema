<template>
  <nav>
    <ul>
      <li>
        <router-link class="router-link-active" to="/contact">
          Movies
        </router-link>
      </li>
      <li>
        <router-link class="router-link-active" to="/screenings"
          >Screenings</router-link
        >
      </li>
      <li>
        <router-link class="router-link-active" to="/contact-us">
          Contact Us
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.router-link-active {
  text-decoration: none;
  color: inherit;
}

ul {
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: stretch;
  gap: 0.125rem;
}

li {
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
    width: 135px;
    left: 19px;
    right: 0;
    bottom: -47px;
    background: var(--color-brand);
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  &:hover {
    cursor: pointer;
    font-weight: 700;
    color: var(--color-brand);

    &::before {
      opacity: 1;
    }
  }
}
</style>

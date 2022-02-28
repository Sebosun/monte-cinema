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

a {
  position: relative;
  transition: color 300ms ease-in-out;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 5px;
    width: 135px;
    left: -20px;
    right: 0;
    bottom: -48px;
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

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.125rem;
}
li {
  color: var(--color-secondary);
}
</style>

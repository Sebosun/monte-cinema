<template>
  <nav>
    <ul>
      <li>Contact Us</li>
      <li>Screenings</li>
      <li>Movies</li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
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
li:hover {
  cursor: pointer;
  font-weight: 700;
  color: var(--color-primary);
}
</style>

<template>
  <div class="flex">
    <button class="button">Book a ticket</button>
    <button class="button button__brand">Book a ticket</button>
    <button class="button button__primary">Book a ticket</button>
    <button class="button button__primary__selected">Book a ticket</button>
  </div>
</template>

<script>
/* TODO:   red transparent buttons */
/* TODO: arrow versions for each of the buttons */
</script>

<style lang="scss">
.flex {
  max-width: 500px;
  margin-inline: auto;
  gap: 10px;
  display: inline-flex;
  flex-direction: column;
}

.button {
  font-size: 1.125rem;
  padding: 1em 2em;

  color: inherit;
  border-radius: 999px;
  background: inherit;
  border: solid;

  &:hover {
    cursor: pointer;
  }

  &__brand {
    color: white;
    background: var(--color-brand);
    border-color: var(--color-brand);
  }

  &__primary {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  &__primary__selected {
    color: white;
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
</style>

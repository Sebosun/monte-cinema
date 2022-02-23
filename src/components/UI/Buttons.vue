<template>
  <div class="flex">
    <button class="button">Book a ticket</button>
    <button class="button button__brand">Book a ticket</button>
    <button class="button button_brand button__brand__empty">
      Book a ticket
    </button>
    <button class="button button__brand__empty__borderless">
      Book a ticket
    </button>
    <button class="button button__primary">Book a ticket</button>
    <button class="button button__primary__selected">Book a ticket</button>
  </div>
</template>

<script>
/* TODO: arrow versions for each of the buttons */
/* TODO : use separate class for font sizes*/
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
  font-size: 1.125rem; /* 18px */
  padding: 1em 2.222em; /* 18px 40px  */

  color: inherit;
  background: inherit;

  border: solid;
  border-radius: 999px;

  font-family: Roboto Mono;
  font-weight: 500;
  letter-spacing: 0.015em;

  &:hover {
    cursor: pointer;
  }

  &__brand {
    color: white;
    background: var(--color-brand);
    border-color: var(--color-brand);
    &__empty {
      background: inherit;
      color: var(--color-brand);
      &__borderless {
        color: var(--color-brand);
        border: 0;
      }
    }
  }

  &__primary {
    color: var(--color-primary);
    border-color: var(--color-primary);
    &__selected {
      color: white;
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}
</style>

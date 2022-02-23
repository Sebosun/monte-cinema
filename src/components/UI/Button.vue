<template>
  <button v-bind:class="applyClass"><slot></slot></button>
</template>

<script>
export default {
  props: {
    variation: {
      type: String,
      required: true,
    },
  },
  computed: {
    applyClass() {
      const variationTrimmed = this.variation.trim();
      const classes = variationTrimmed.split(" ").join("__");
      return `button button__${classes}`;
    },
  },
};

/* <Button class="brand">Book a ticket</button> */
/* <Button class="brand empty"> */
/*   Book a ticket */
/* </Button> */
/* <Button class="brand empty borderless"> */
/*   Book a ticket */
/* </Button> */
/* <Button variation="button primary">Book a ticket</button> */
/* <Button variation="button primary  selected">Book a ticket</button> */

/* TODO: arrow versions for each of the buttons */
/* TODO : use separate class for font sizes*/
</script>

<style lang="scss">
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

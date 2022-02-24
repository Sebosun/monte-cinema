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
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    applyClass() {
      let styles = "button button__";
      const variationTrimmed = this.variation.trim();
      styles += variationTrimmed.split(" ").join("__");
      styles += this.hasSize;
      return styles;
    },
    hasSize() {
      let sizeClasses = " ";
      sizeClasses += this.small
        ? "button--sm"
        : this.medium
        ? "button--md"
        : this.large
        ? "button--lg"
        : "";
      return sizeClasses == " " ? "" : sizeClasses;
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
.button--lg {
  font-size: 1.125rem; /* 18px */
  padding: 1em 2.222em; /* 18px 40px  */
}
.button--md {
  font-size: 1rem;
  padding: 0.75em 2em;
}
.button--sm {
  font-size: 0.875rem;
  padding: 1.714em 0.643em;
}

.button {
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

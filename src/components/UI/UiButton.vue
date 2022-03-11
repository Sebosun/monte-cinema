<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="[buttonUtililityClasses, buttonColors]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    colors: {
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
    empty: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonUtililityClasses() {
      return [
        "button",
        { "button--sm": this.small },
        { "button--md": this.medium },
        { "button--lg": this.large },
        { "button--empty": this.empty },
        { "button--borderless": this.borderless },
      ];
    },
    // making sure we're using appropriate colors as a text color
    // if background is empty
    buttonColors() {
      if (this.colors === "brand") {
        return this.empty ? "button--brand-font" : "button__brand";
      } else if (this.colors === "primary") {
        return this.empty ? "button--primary-font" : "button__primary";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  color: inherit;
  background: inherit;

  border: solid;
  border-radius: 999px;

  font-family: Roboto Mono;
  font-weight: 500;
  letter-spacing: 0.015em;
  border-width: 2px;

  &:hover {
    cursor: pointer;
  }

  /* sizes */

  &:disabled {
    background-color: var(--color-secondary);
    cursor: not-allowed;
    border: 0;
    &:hover {
      opacity: 90%;
    }
  }

  &--sm {
    font-size: 0.875rem;
    padding: 0.643em 1.714em;
  }

  &--md {
    font-size: 1rem;
    padding: 0.95em 2em;
  }

  &--lg {
    font-size: 1.125rem; /* 18px */
    padding: 1em 2.222em; /* 18px 40px  */
  }

  /* utility classes */

  &--empty {
    background: inherit;
  }

  &--borderless {
    border: 0;
  }

  /* Colors */

  &--brand-font {
    color: var(--color-brand);
  }

  &--primary-font {
    color: var(--color-primary);
  }

  &__brand {
    color: var(--color-background);
    background: var(--color-brand);
    border-color: var(--color-brand);
  }

  &__primary {
    color: var(--color-background);
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
</style>

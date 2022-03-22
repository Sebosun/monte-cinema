<script>
//TODO make accesibility better (ring)
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
    transparent: {
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
        { "button--transparent": this.transparent },
        { "button--borderless": this.borderless },
      ];
    },
    // making sure we're using appropriate colors as a text color
    // if background is transparent
    buttonColors() {
      if (this.colors === "brand") {
        return this.transparent ? "button--brand-font" : "button__brand";
      } else if (this.colors === "primary") {
        return this.transparent ? "button--primary-font" : "button__primary";
      }
      return "";
    },
  },
};
</script>

<template>
  <button
    @click="$emit('click', $event)"
    :disabled="disabled"
    :class="[buttonUtililityClasses, buttonColors]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  color: inherit;
  background: inherit;

  border: solid;
  border-radius: 62.4375rem;

  font-family: Roboto Mono;
  font-weight: 500;
  letter-spacing: 0.015em;
  border-width: 0.125rem;
  transition: color 0.2s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  /* sizes */

  &:disabled {
    background-color: var(--color-secondary);
    cursor: not-allowed;
    border-color: var(--color-secondary);
    &:hover {
      color: white;
      background: var(--color-secondary);
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

  &--transparent {
    background: inherit;
  }

  &--borderless {
    border: 0;
    &:hover {
      background-color: transparent;
      color: var(--color-brand);
    }
  }

  /* Colors */

  &--brand-font {
    color: var(--color-brand);
    &:hover {
      background-color: var(--color-brand);
      color: var(--color-background);
    }
  }

  &--primary-font {
    color: var(--color-primary);
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
    &:hover svg {
      fill: var(--color-background);
    }
  }

  &__brand {
    color: var(--color-background);
    background: var(--color-brand);
    border-color: var(--color-brand);
    &:hover {
      color: var(--color-brand);
      background-color: var(--color-background);
    }
  }

  &__primary {
    color: var(--color-background);
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
</style>

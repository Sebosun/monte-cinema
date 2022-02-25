<template>
  <button :class="[componentClasses, whichBrandColor]">
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
  },
  computed: {
    componentClasses() {
      return [
        "button",
        { button__primary: this.colors === "primary" },
        { "button__primary--selected": this.colors === "primary selected" },
        { "button--sm": this.small },
        { "button--md": this.medium },
        { "button--lg": this.large },
        { "button--empty": this.empty },
        { "button--borderless": this.borderless },
      ];
    },
    // making sure we're still using brand color even if background is empty
    whichBrandColor() {
      if (this.colors === "brand" && this.empty) {
        return "button--brand-font";
      } else {
        return "button__brand";
      }
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

  &:hover {
    cursor: pointer;
  }

  &--lg {
    font-size: 1.125rem; /* 18px */
    padding: 1em 2.222em; /* 18px 40px  */
  }
  &--md {
    font-size: 1rem;
    padding: 0.95em 2em;
  }
  &--sm {
    font-size: 0.875rem;
    padding: 0.643em 1.714em;
  }

  &--empty {
    background: var(--color-background);
  }

  &--borderless {
    border: 0;
  }

  &--brand-font {
    color: var(--color-brand);
  }

  &__brand {
    color: var(--color-background);
    background: var(--color-brand);
    border-color: var(--color-brand);
  }

  &__primary {
    color: var(--color-primary);
    border-color: var(--color-primary);
    background-color: var(--color-background);
    &--selected {
      color: var(--color-background);
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}
</style>

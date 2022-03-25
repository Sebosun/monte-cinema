<template>
  <div class="tag background--rose">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tag {
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;

  font-size: 0.875rem;
  font-weight: bold;
  max-width: fit-content;

  color: var(--color-red);
  background: var(--color-rose);
}
</style>

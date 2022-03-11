<template>
  <div class="error">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.error {
  text-align: center;
  color: var(--color-brand);
  margin: 5rem auto;
  @include media-md {
    font-size: 48px;
  }
}
</style>

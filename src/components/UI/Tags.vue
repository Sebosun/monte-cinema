<script></script>

<template>
  <div class="tag background--rose">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tag {
  padding: 8px 16px;
  border-radius: 24px;

  font-size: 14px;
  font-weight: bold;
  max-width: fit-content;

  color: var(--color-red);
  background: var(--color-rose);
}
</style>

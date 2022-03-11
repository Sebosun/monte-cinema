<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss">
@include media-sm {
  .card {
    padding: 0 0 1rem 1rem;
    box-shadow: inset 0px -1px 0px #eaeaea;
  }
}
@include media-md {
  .card {
    background: white;
    border-radius: 8px;

    box-shadow: 0px 1.596024513244629px 5.187079429626465px 0px #00000004;
    box-shadow: 0px 5.360713958740234px 17.422321319580078px 0px #00000006;
    box-shadow: 0px 24px 78px 0px #00000014;
  }
}
</style>

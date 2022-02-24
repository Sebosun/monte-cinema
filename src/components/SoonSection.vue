<template>
  <section class="soon">
    <div class="soon__top">
      <h2 class="font--paragraph font--bold">Soon</h2>
      <ui-button class="font--bold" large variation="brand empty borderless"
        >See All</ui-button
      >
    </div>
    <movie-card class="soon__movies">
      <div>
        <h2>Predator</h2>
        <div>1h 30 min</div>
      </div>
      <img src="../assets/arnie.png" alt="arnie" />
      <div>Action</div>
    </movie-card>
  </section>
</template>

<script>
import MovieCard from "./UI/MovieCard.vue";
import UiButton from "./UI/UiButton.vue";
export default { components: { UiButton, MovieCard } };
</script>

<style lang="scss">
.soon {
  padding-inline: 24px;
  &__top {
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 22px;
      line-height: 170%;
      letter-spacing: 0.015em;
      text-transform: uppercase;
    }
    button {
      font-size: 22px;
      padding: 0;
      text-transform: uppercase;
    }
  }
  &__movies {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    h2 {
      margin: 0;
      padding: 0;
    }
  }
}
</style>

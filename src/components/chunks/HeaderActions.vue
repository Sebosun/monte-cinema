<script>
import UiButton from "../UI/UiButton.vue";
export default {
  components: { UiButton },
};
</script>

<template>
  <div class="header-actions">
    <UiButton medium borderless empty colors="brand">
      <router-link :to="{ name: 'Register' }"> Register </router-link>
    </UiButton>
    <UiButton medium colors="brand">
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </UiButton>
  </div>
</template>

<style lang="scss"></style>

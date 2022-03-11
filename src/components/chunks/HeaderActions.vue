<script>
import UiButton from "../UI/UiButton.vue";
export default {
  components: { UiButton },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<template>
  <div class="header-actions">
    <template v-if="isLoggedIn">
      <UiButton @click="logout" medium colors="brand"> Logout </UiButton>
    </template>
    <template v-else>
      <UiButton medium borderless empty colors="brand">
        <router-link :to="{ name: 'Register' }"> Register </router-link>
      </UiButton>
      <UiButton medium colors="brand">
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </UiButton>
    </template>
  </div>
</template>

<style lang="scss"></style>

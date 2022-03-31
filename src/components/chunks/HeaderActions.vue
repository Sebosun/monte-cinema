<script>
import UiButton from "@/components/UI/UiButton.vue";
export default {
  components: { UiButton },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
};
</script>

<template>
  <div class="header-actions">
    <template v-if="isLoggedIn">
      <UiButton @click="logout" medium colors="brand">
        {{ $t("navigation.logout") }}
      </UiButton>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Register' }">
        <UiButton medium borderless transparent colors="brand">{{
          $t("navigation.registration")
        }}</UiButton>
      </router-link>
      <router-link :to="{ name: 'Login' }">
        <UiButton medium colors="brand">
          {{ $t("navigation.login") }}
        </UiButton>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import UiButton from "@/components/UI/UiButton.vue";

import { defineComponent, computed, ComputedRef } from "@vue/composition-api";
import getStore from "@/helpers/composables/store";

export default defineComponent({
  components: { UiButton },
  setup() {
    const { store } = getStore();

    function logout() {
      store.dispatch("user/logout");
    }

    const isLoggedIn: ComputedRef<boolean> = computed(() => {
      return store.getters["user/isLoggedIn"];
    });

    return { logout, isLoggedIn };
  },
});
</script>

<template>
  <div class="header-actions">
    <template v-if="isLoggedIn">
      <router-link :to="{ name: 'Account' }">
        <UiButton medium colors="brand" transparent>
          {{ $t("navigation.my_account") }}
        </UiButton>
      </router-link>
      <UiButton @click="logout" medium colors="brand">
        {{ $t("navigation.logout") }}
      </UiButton>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Register' }">
        <UiButton medium borderless transparent colors="brand">
          {{ $t("navigation.registration") }}
        </UiButton>
      </router-link>
      <router-link :to="{ name: 'Login' }">
        <UiButton medium colors="brand">
          {{ $t("navigation.login") }}
        </UiButton>
      </router-link>
    </template>
  </div>
</template>

<style scoped lang="scss">
.header-actions {
  button {
    margin-right: 10px;
  }
}
</style>

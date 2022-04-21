<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import AccountNav from "@/components/navigation/AccountNav.vue";
import PersonalDetails from "@/components/sections/PersonalDetails.vue";
import ReservationsSection from "@/components/sections/ReservationsSection.vue";

import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  components: { MainHeader, AccountNav, PersonalDetails, ReservationsSection },
  setup() {
    const activePage = ref("details");

    function handlePageChange(pageName: string) {
      activePage.value = pageName;
    }

    return { activePage, handlePageChange };
  },
});
</script>

<template>
  <div>
    <MainHeader />
    <main>
      <account-nav
        @changeActivePage="handlePageChange"
        :activePage="activePage"
      />
      <transition name="fade" mode="out-in">
        <template v-if="activePage === 'details'">
          <PersonalDetails />
        </template>
        <template v-else-if="activePage === 'reservations'">
          <ReservationsSection />
        </template>
      </transition>
    </main>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

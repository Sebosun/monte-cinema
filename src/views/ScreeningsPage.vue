<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import AllScreeningsLogic from "@/components/sections/AllScreeningsLogic.vue";
export default {
  components: { MainHeader, BreadcrumbNavigation, AllScreeningsLogic },
};
</script>

<template>
  <div class="screenings-page">
    <MainHeader />
    <BreadcrumbNavigation>Screenings</BreadcrumbNavigation>
    <main>
      <all-screenings-logic></all-screenings-logic>
    </main>
  </div>
</template>

<style scoped></style>

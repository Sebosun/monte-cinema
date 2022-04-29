<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation.vue";
import AllScreeningsLogic from "@/components/sections/AllScreeningsLogic.vue";
export default {
  metaInfo: {
    title: "Screenings",
  },
  components: { MainHeader, BreadcrumbNavigation, AllScreeningsLogic },
};
</script>

<template>
  <div class="screenings-page">
    <MainHeader />
    <BreadcrumbNavigation>Screenings</BreadcrumbNavigation>
    <main>
      <AllScreeningsLogic />
    </main>
  </div>
</template>

<style scoped></style>

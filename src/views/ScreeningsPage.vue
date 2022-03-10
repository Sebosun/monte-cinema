<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import Screenings from "@/components/sections/Screenings.vue";
export default {
  components: { MainHeader, BreadcrumbNavigation, Screenings },
};
</script>

<template>
  <div class="screenings-page">
    <main-header />
    <breadcrumb-navigation>Screenings</breadcrumb-navigation>
    <screenings />
  </div>
</template>

<style scoped></style>

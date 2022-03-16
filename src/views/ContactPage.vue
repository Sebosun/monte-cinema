<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
export default {
  components: { MainHeader, BreadcrumbNavigation, ContactSection },
};
</script>

<template>
  <div class="concact">
    <MainHeader />
    <BreadcrumbNavigation>Contact us</BreadcrumbNavigation>
    <div>
      <h1>Contact us</h1>
      <div>
        <div>Map</div>
        <ContactSection />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

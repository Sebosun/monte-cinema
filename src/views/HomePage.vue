<script>
import HeroSection from "@/components/sections/HeroSection";
import SoonSection from "@/components/sections/SoonSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import MainHeader from "@/components/MainHeader.vue";
import AllScreeningsLogic from "@/components/sections/AllScreeningsLogic.vue";

export default {
  name: "Home",
  components: {
    HeroSection,
    SoonSection,
    ContactSection,
    MainHeader,
    AllScreeningsLogic,
  },
};
</script>
, MainHeader
<template>
  <div>
    <MainHeader />
    <main class="main">
      <HeroSection />
      <SoonSection />
      <AllScreeningsLogic />
    </main>
    <ContactSection />
  </div>
</template>

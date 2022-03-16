<script>
import ContactCard from "@/components/chunks/ContactCard.vue";
export default {
  components: { ContactCard },
};
</script>

<template>
  <div class="contact">
    <h1 class="font--header">Contact Us</h1>
    <ContactCard class="contact--card" />
  </div>
</template>

<style scoped lang="scss">
.contact {
  margin-inline: auto;
  margin-bottom: 5rem;

  @include media-sm {
    max-width: 320px;
  }

  @include media-md {
    max-width: 600px;
    h1 {
      font-size: 64px;
    }
  }
}
</style>

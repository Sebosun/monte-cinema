<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation.vue";
import ContactCard from "@/components/chunks/ContactCard.vue";
import SocialMediaIconsList from "@/components/chunks/SocialMediaIconsList.vue";
export default {
  components: {
    MainHeader,
    BreadcrumbNavigation,
    ContactCard,
    SocialMediaIconsList,
  },
};
</script>

<template>
  <div class="contact">
    <MainHeader />
    <BreadcrumbNavigation>Contact us</BreadcrumbNavigation>
    <main class="contact__content">
      <h1 class="font--header">Contact us</h1>
      <div class="contact__wrapper">
        <div role="img" aria-label="map to monterail" class="contact__img" />
        <ContactCard class="contact__card" />
        <SocialMediaIconsList />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.contact {
  margin-bottom: 9rem;
  &__img {
    background-image: url("../assets/MonterailMap.png");
    background-position: center;
    background-repeat: no-repeat;
    min-height: 312px;
  }

  @include media-sm {
    &__content {
      margin-inline: 24px;
    }

    h1 {
      font-size: 48px;
    }

    &__img {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      max-width: 100%;
      height: 100%;
    }

    &__wrapper {
      max-width: 600px;
      margin-inline: auto;
      display: flex;
      flex-direction: column;
    }
  }

  @include media-md {
    max-height: 412px;

    h1 {
      font-size: 80px;
      margin: 40px 0 24px;
    }

    &__wrapper {
      background: #f7f7f7;
      display: grid;
      grid-template-columns: min(40%, 620px) 1fr min(10%, 80px);
    }

    &__img {
      max-width: 100%;
      height: 100%;
    }

    &__card {
      flex: 1;
    }
  }
}
</style>

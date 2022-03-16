<script>
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import ContactCard from "@/components/chunks/ContactCard.vue";
export default {
  components: { MainHeader, BreadcrumbNavigation, ContactCard },
};
</script>

<template>
  <div class="contact">
    <MainHeader />
    <BreadcrumbNavigation>Contact us</BreadcrumbNavigation>
    <div>
      <h1>Contact us</h1>
      <div class="contact__wrapper">
        <div class="contact__img" />
        <ContactCard class="contact__card" />
        <ul class="contact__socials">
          <li>Twitter</li>
          <li>Facebook</li>
          <li>LinkedIn</li>
          <li>Instagram</li>
          <li>Github</li>
          <li>Be</li>
          <li>No Idea</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__img {
    background-image: url("../assets/MonterailMap.png");
    background-position: center;
    background-repeat: no-repeat;
    min-height: 312px;
  }

  @include media-sm {
    &__wrapper {
      display: flex;
      flex-direction: column;
    }

    margin-inline: 24px;
    h1 {
      font-size: 48px;
    }
  }

  @include media-md {
    max-height: 412px;
    &__wrapper {
      background: #f7f7f7;
      display: grid;
      grid-template-columns: min(40%, 620px) 1fr min(10%, 150px);
    }

    &__socials {
      flex-flow: column;
      justify-content: space-around;
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

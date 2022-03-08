<script>
import Location from "@/assets/pin-location.svg";
import Email from "@/assets/email.svg";
import Phone from "@/assets/phone.svg";
export default { components: { Location, Email, Phone } };
</script>

<template>
  <div class="contact">
    <h1 class="font--header">Contact Us</h1>
    <div class="contact__card">
      <div class="contact__location">
        <Location />
        <div class="contact__location">
          <p>Monterail Sp. z o.o.</p>
          <p>ul. Oławska 27-29</p>
          <p>50-123 Wrocław</p>
          <p>Poland</p>
        </div>
      </div>
      <div class="contact__email">
        <Email />
        <p>hello@monterail.com</p>
      </div>
      <div class="contact__phone">
        <Phone />
        <a href="tel:+48 533 600 136"> +48 533 600 136 </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
p,
a {
  margin: 0;
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.015em;

  color: var(--color-primary);
}

.contact {
  max-width: 320px;
  margin-inline: auto;
  margin-bottom: 5rem;

  h1 {
    text-align: center;
  }

  &__card {
    padding: 24px;
    background: #f7f7f7;

    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 8px;
  }

  &__location {
    display: flex;
    gap: 10px;
  }

  &__location div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__email,
  &__phone {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @include media-md {
    max-width: 600px;
    h1 {
      font-size: 64px;
    }
    &__card {
      padding: 64px;
    }
  }
}
</style>

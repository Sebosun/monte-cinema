<script>
import Location from "@/assets/pin-location.svg";
import Email from "@/assets/email.svg";
import Phone from "@/assets/phone.svg";
export default { components: { Location, Email, Phone } };
</script>

<template>
  <div class="contact-card">
    <div class="contact-card__location">
      <Location />
      <div class="contact-card__location">
        <p>Monterail Sp. z o.o.</p>
        <p>ul. Oławska 27-29</p>
        <p>50-123 Wrocław</p>
        <p>Poland</p>
      </div>
    </div>
    <div class="contact-card__email">
      <Email />
      <a href="mailto:hello@monterail.com">hello@monterail.com</a>
    </div>
    <div class="contact-card__phone">
      <Phone />
      <a href="tel:+48 533 600 136"> +48 533 600 136 </a>
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

.contact-card {
  padding: 24px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 100%;
  border-radius: 8px;

  h1 {
    text-align: center;
  }

  &__location {
    display: flex;
    gap: 16px;
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
  @include media-sm {
    gap: 16px;
  }

  @include media-md {
    gap: 16px;
    padding: 64px;
    font-size: 16px;
  }
}
</style>

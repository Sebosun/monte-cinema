<script>
import AuthHeader from "@/components/AuthHeader.vue";
import EmailPasswordFormValidated from "@/components/EmailPasswordFormValidated.vue";
export default {
  data() {
    return {
      userCredentials: { email: "", password: "" },
      nextStep: false,
    };
  },
  methods: {
    saveCredentials(event) {
      console.log(event);
    },
  },
  computed: {
    step() {
      return this.isValidEmailPassword && this.nextStep ? 1 : 0;
    },
  },
  components: { AuthHeader, EmailPasswordFormValidated },
};
</script>

<template>
  <div>
    <AuthHeader />
    <div class="register-page">
      <div v-if="step === 0">
        <h1 class="font--header">Ahoy you!</h1>
        <h2 class="font--header">Care to register?</h2>
        <EmailPasswordFormValidated @submit="saveCredentials" />
      </div>
      <StepTwo v-if="step === 1" />
    </div>
  </div>
</template>

<style lang="scss">
.register-page {
  margin: 64px 0;
  margin-inline: auto;
  max-width: 615px;
  padding: 0;
  h1,
  h2 {
    font-size: 40px;
    text-align: center;

    padding: 0;
    margin: 0;
  }
  h2 {
    color: var(--color-secondary);
  }
  @include media-md {
    h1,
    h2 {
      font-size: 80px;
      text-align: left;
    }
  }
}
</style>

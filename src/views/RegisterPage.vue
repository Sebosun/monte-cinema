<script>
import AuthHeader from "@/components/AuthHeader.vue";
import EmailPasswordFormValidated from "@/components/EmailPasswordFormValidated.vue";
export default {
  data() {
    return {
      password: "",
      email: "",
      nextStep: false,
    };
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
      <EmailPasswordFormValidated v-if="step === 0" />
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
}
</style>

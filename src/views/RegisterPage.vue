<script>
import AuthHeader from "@/components/AuthHeader.vue";
import EmailPasswordFormValidated from "@/components/chunks/EmailPasswordFormValidated.vue";
import UserInformationForm from "@/components/chunks/UserInformationForm.vue";
export default {
  data() {
    return {
      userCredentials: { email: "", password: "" },
      nextStep: false,
      error: { status: false, message: "" },
    };
  },
  methods: {
    saveCredentials(event) {
      this.userCredentials = event;
      this.nextStep = true;
    },
    async submitRegistration(event) {

      /* console.log("data submitted to the server", event); */
      const userCreds = {
        ...this.userCredentials,
        first_name: event.firstName,
        last_name: event.lastName,
        date_of_birth: event.birthday,
      };

      try {
        await this.$store.dispatch("user/register", userCreds);
      } catch (error) {
        this.error = {
          status: true,
          message:
            "Something went wrong. Please recheck the inputs and again later",
        };
      }
    },
  },
  computed: {
    step() {
      return this.isValidEmailPassword && this.nextStep ? 1 : 0;
    },
  },
  metaInfo: {
    title: "Registration",
  },
  components: {
    AuthHeader,
    EmailPasswordFormValidated,
    UserInformationForm,
  },
};
</script>

<template>
  <div>
    <AuthHeader />
    <div class="register-page">
      <div v-if="nextStep">
        <h1 class="font--header">Great!</h1>
        <h2 class="font--header">Now your name</h2>
        <UserInformationForm :error="error" @submit="submitRegistration" />
      </div>
      <div v-else>
        <h1 class="font--header">Ahoy you!</h1>
        <h2 class="font--header">Care to register?</h2>
        <EmailPasswordFormValidated @submit="saveCredentials" />
      </div>
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

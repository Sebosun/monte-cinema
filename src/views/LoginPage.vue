<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.email, this.password);
    },
  },
  components: { UiButton, PasswordInputShowHide },
};
</script>

<template>
  <div class="login-page">
    <h1 class="font--header">Hi There!</h1>
    <h2 class="font--header">Care to log in?</h2>
    <div class="login-page__wrapper">
      <form @submit.prevent="submitForm" class="login-page__form">
        <ul>
          <li>
            <label class="font--label" for="email">Email </label>
            <input
              name="email"
              type="email"
              v-model="email"
              placeholder="Something ending with @monterail.com"
            />
          </li>
          <li>
            <password-input-show-hide v-model="password" />
          </li>
        </ul>
        <ui-button medium colors="brand">Log in</ui-button>
      </form>
      <ui-button medium empty borderless colors="brand"
        >Register instead</ui-button
      >
      <p class="login-page__forgot">
        Forgot your password?
        <router-link :to="{ name: 'Register' }">Reset it now</router-link>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  margin: 64px 0;
  margin-inline: auto;
  max-width: 600px;
  padding: 0;

  h1 {
    font-size: 40px;
    text-align: center;

    padding: 0;
    margin: 0;
  }

  h2 {
    font-size: 40px;
    text-align: center;

    padding: 0;
    margin: 0;
    color: var(--color-secondary);
  }

  li {
    list-style-type: none;
  }
  label {
    display: block;
  }

  &__wrapper {
    max-width: 600px;
    margin: 48px 24px 12px;
  }

  &__form label {
    margin: 10px 0;
    max-width: 100%;
  }
  & ul {
    padding: 0;
  }

  & li {
    display: flex;
    justify-content: center;
    margin-inline: auto;
    flex-direction: column;
  }

  & input {
    background-color: #f7f7f7;
    border: 0;
    padding: 17.5px 24px;
    max-width: 100%;
  }

  & .button {
    width: 100%;
  }

  &__forgot {
    text-align: center;
  }

  a {
    color: var(--color-brand);
    &:hover,
    &:focus {
      font-weight: bold;
    }
  }
}
</style>

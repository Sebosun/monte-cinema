<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import FormWrapper from "./UI/FormWrapper.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      isEmailTouched: false,
      isPasswordTouched: false,
    };
  },
  methods: {
    submitForm() {
      this.touchAll();
      console.log(this.email, this.password);
    },
    touchAll() {
      this.isEmailTouched = true;
      this.isPasswordTouched = true;
    },
  },
  computed: {
    emailError() {
      if (!this.isEmailTouched) return "";
      return validateEmail(this.email, this.isEmailTouched);
    },
    passwordError() {
      if (!this.isPasswordTouched) return "";
      return validatePassword(this.password, this.isPasswordTouched);
    },
    isFormValid() {
      return !this.emailError && !this.passwordError;
    },
  },
  components: { UiButton, PasswordInputShowHide, FormWrapper },
};
</script>

<template>
  <div class="register-page__wrapper">
    <h1 class="font--header">Ahoy you!</h1>
    <h2 class="font--header">Care to register?</h2>
    <FormWrapper>
      <form novalidate @submit.prevent="submitForm" class="register-page__form">
        <ul>
          <li :class="{ 'register-page--error': !!emailError }">
            <label class="font--label" for="email">Email </label>
            <input
              required
              @blur="isEmailTouched = true"
              name="email"
              type="email"
              v-model="email"
              placeholder="example@monterail.com"
            />
            <div class="register-page__error">{{ emailError }}</div>
          </li>

          <li :class="{ 'register-page--error': !!passwordError }">
            <password-input-show-hide
              @touched="isPasswordTouched = true"
              v-model="password"
            />
            <div class="register-page__error">{{ passwordError }}</div>
          </li>
        </ul>

        <div class="register-page__buttons">
          <ui-button :disabled="!isFormValid" colors="brand">Log in</ui-button>
          <ui-button
            class="register-page__buttons--register"
            empty
            borderless
            colors="brand"
          >
            <router-link :to="{ name: 'Login' }">Log in instead</router-link>
          </ui-button>
        </div>
      </form>
    </FormWrapper>
    <p class="register-page__forgot">
      Forgot your password?
      <router-link :to="{ name: 'Register' }">Reset it now</router-link>
    </p>
  </div>
</template>

<style lang="scss">
.register-page {
  &--error {
    input {
      border: 2px solid red;
    }
  }

  &__error {
    margin-top: 10px;
    color: var(--color-error);
  }

  &__buttons {
    margin: 67px 0;
  }

  .button {
    width: 100%;
    font-size: 1rem;
    padding: 0.95em 2em;
  }

  &__forgot {
    text-align: center;

    font-size: 16px;
    line-height: 170%;

    letter-spacing: 0.04em;
    color: #343541;
  }

  &__forgot a {
    text-align: center;

    font-size: 16px;
    line-height: 170%;

    letter-spacing: 0.04em;
    color: #343541;
  }

  @include media-sm {
    &__wrapper {
      margin: 48px 24px 12px;
    }
  }

  @include media-md {
    &__buttons {
      display: flex;
      flex-direction: row-reverse;
      margin: 40px 0 0;
    }

    &__buttons .button {
      font-size: 18px;
      padding: 0.95em 2em;
      &:last-child {
        margin-right: 10px;
        padding: 0;
      }
    }

    &__forgot {
      text-align: left;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import FormWrapper from "@/components/UI/FormWrapper.vue";

type InputError = boolean | string;

interface PasswordValidation {
  length: boolean;
  digits: boolean;
  letters: boolean;
}

export default Vue.extend({
  data() {
    return {
      email: "" as string,
      password: "",
      isEmailTouched: false,
      isPasswordTouched: false,
    };
  },
  methods: {
    submitForm() {
      this.touchAll();
      if (this.isFormValid) {
        this.$emit("submit", { email: this.email, password: this.password });
      }
    },
    touchAll() {
      this.isEmailTouched = true;
      this.isPasswordTouched = true;
    },
    getValidationClass(validationType: "length" | "digits" | "letters") {
      const validator = this.passwordValidation[validationType];
      if (validator === false) return "";
      return validator ? "validated-form__info" : "validated-form__info--error";
    },
  },
  computed: {
    emailError(): InputError {
      if (!this.isEmailTouched) return false;
      const emailValidation = validateEmail(this.email);
      return emailValidation ? emailValidation : "";
    },
    passwordError(): InputError {
      if (!this.isPasswordTouched) return false;
      return validatePassword(this.password);
    },
    passwordValidation(): PasswordValidation {
      return {
        length: this.isPasswordTouched ? this.password.length > 8 : false,
        digits: this.isPasswordTouched ? !!this.password.match(/\d/) : false,
        letters: this.isPasswordTouched
          ? !!this.password.match(/[a-zA-Z]/)
          : false,
      };
    },
    isFormValid(): boolean {
      return !this.emailError && !this.passwordError;
    },
  },

  components: { UiButton, PasswordInputShowHide, FormWrapper },
});
</script>

<template>
  <div class="validated-form">
    <FormWrapper>
      <form
        novalidate
        @submit.prevent="submitForm"
        class="validated-form__form"
      >
        <ul>
          <li :class="{ 'validated-form__error--input': !!emailError }">
            <label class="font--label" for="email">Email </label>
            <input
              required
              @blur="isEmailTouched = true"
              name="email"
              type="email"
              v-model="email"
              placeholder="example@monterail.com"
            />
            <div v-if="emailError" class="validated-form__error--message">
              {{ emailError }}
            </div>
          </li>

          <li :class="{ 'validated-form__error--input': !!passwordError }">
            <password-input-show-hide
              @touched="isPasswordTouched = true"
              v-model="password"
            />
          </li>
        </ul>

        <p :class="getValidationClass('length')">At least 8 characters</p>
        <p :class="getValidationClass('letters')">At least one letter</p>
        <p :class="getValidationClass('digits')">At least one digit</p>

        <div class="action-buttons">
          <ui-button :disabled="!isFormValid" colors="brand"
            >Next Step</ui-button
          >
          <router-link :to="{ name: 'Login' }">
            <ui-button transparent borderless colors="brand">
              Log in instead
            </ui-button>
          </router-link>
        </div>
      </form>
    </FormWrapper>

    <p class="validated-form__forgot">
      Forgot your password?
      <router-link :to="{ name: 'Register' }">Reset it now</router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
.validated-form {
  &__info {
    color: #27ae60;
  }

  &__info--error {
    color: var(--color-error);
  }

  &__error {
    &--input input {
      border: 2px solid red;
    }
    &--message {
      margin-top: 10px;
      color: var(--color-error);
    }
  }

  &__forgot {
    text-align: center;

    font-size: 16px;
    line-height: 170%;

    letter-spacing: 0.04em;
    color: #343541;
  }

  &__forgot a {
    color: var(--color-brand);
    text-align: center;
    font-weight: bold;
  }

  @include media-md {
    &__forgot {
      text-align: left;
    }
  }
}
</style>

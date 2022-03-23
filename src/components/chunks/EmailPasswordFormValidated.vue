<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";

import validateEmail from "@/helpers/validateEmail.ts";
import validatePassword from "@/helpers/validatePassword";
import FormWrapper from "@/components/UI/FormWrapper.vue";

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
      if (this.isFormValid) {
        this.$emit("submit", { email: this.email, password: this.password });
      }
    },
    touchAll() {
      this.isEmailTouched = true;
      this.isPasswordTouched = true;
    },
    getValidationClass(validationType) {
      const validator = this.passwordValidation[validationType];
      if (typeof validator === "undefined") return "";
      return validator ? "validated-form__info" : "validated-form__info--error";
    },
  },
  computed: {
    emailError() {
      if (!this.isEmailTouched) return false;
      return validateEmail(this.email, this.isEmailTouched);
    },
    passwordError() {
      if (!this.isPasswordTouched) return false;
      return validatePassword(this.password, this.isPasswordTouched);
    },
    passwordValidation() {
      return {
        length: this.isPasswordTouched ? this.password.length > 8 : undefined,
        digits: this.isPasswordTouched
          ? !!this.password.match(/\d/)
          : undefined,
        letters: this.isPasswordTouched
          ? !!this.password.match(/[a-zA-Z]/)
          : undefined,
      };
    },
    isFormValid() {
      return !this.emailError && !this.passwordError;
    },
  },

  components: { UiButton, PasswordInputShowHide, FormWrapper },
};
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
            <div class="validated-form__error--message">{{ emailError }}</div>
          </li>

          <li
            :class="{ 'validated-form__error--input': !!passwordError.valid }"
          >
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

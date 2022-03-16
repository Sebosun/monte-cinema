<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import FormWrapper from "@/components/UI/FormWrapper.vue";

export default {
  //TODO finish registration and email validation
  // after submition (since it doesnt double check now ??)
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
  },
  computed: {
    emailError() {
      if (!this.isEmailTouched) return "";
      return validateEmail(this.email, this.isEmailTouched);
    },
    passwordError() {
      if (!this.isPasswordTouched) return false;
      return validatePassword(this.password, this.isPasswordTouched);
    },
    isFormValid() {
      return !this.emailError && !this.passwordError;
    },
    passwordLength() {
      if (!this.isPasswordTouched) return "";
      return this.password.length > 8 ? "positive" : "negative";
    },
    passwordDigits() {
      if (!this.isPasswordTouched) return "";
      const matchNumbers = this.password.match(/\d/);
      return matchNumbers ? "positive" : "negative";
    },
    passwordLetters() {
      if (!this.isPasswordTouched) return "";
      const matchLetters = this.password.match(/[a-zA-Z]/);
      return matchLetters ? "positive" : "negative";
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

        <p :class="passwordLength">At least 8 characters</p>
        <p :class="passwordLetters">At least one letter</p>
        <p :class="passwordDigits">At least one digit</p>

        <div class="action-buttons">
          <ui-button :disabled="!isFormValid" colors="brand"
            >Next Step</ui-button
          >
          <ui-button empty borderless colors="brand">
            <router-link :to="{ name: 'Login' }">Log in instead</router-link>
          </ui-button>
        </div>
      </form>
    </FormWrapper>

    <p class="validated-form__forgot">
      Forgot your password?
      <router-link :to="{ name: 'Register' }">Reset it now</router-link>
    </p>
  </div>
</template>

<style lang="scss">
.positive {
  color: #27ae60;
}

.negative {
  color: var(--color-error);
}

.validated-form {
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

  // TODO clean this
  &__forgot a {
    text-align: center;

    font-size: 16px;
    line-height: 170%;

    letter-spacing: 0.04em;
    color: #343541;
  }

  &__forgot a {
    font-weight: bold;
    color: var(--color-brand);
  }

  @include media-md {
    &__forgot {
      text-align: left;
    }
  }
}
</style>

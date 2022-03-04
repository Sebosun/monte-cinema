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
        console.log("success");
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

          <li :class="{ 'validated-form__error--input': !!passwordError }">
            <password-input-show-hide
              @touched="isPasswordTouched = true"
              v-model="password"
            />
            <div class="validated-form__error--message">
              {{ passwordError }}
            </div>
          </li>
        </ul>

        <div class="validated-form__buttons">
          <ui-button :disabled="!isFormValid" colors="brand"
            >Next Step</ui-button
          >
          <ui-button
            class="validated-form__buttons--register"
            empty
            borderless
            colors="brand"
          >
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

  &__forgot a {
    font-weight: bold;
    color: var(--color-brand);
  }

  @include media-sm {
    margin: 48px 24px 12px;
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

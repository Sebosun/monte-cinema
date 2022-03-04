<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
import AuthHeader from "@/components/AuthHeader.vue";

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
      return this.email.length > 0 ? "" : "Email cannot be empty";
    },
    passwordError() {
      if (!this.isPasswordTouched) return "";
      return this.password.length > 0 ? "" : "Password cannot be empty";
    },
    isFormValid() {
      return !this.emailError && !this.passwordError;
    },
  },
  components: { UiButton, PasswordInputShowHide, AuthHeader, FormWrapper },
};
</script>

<template>
  <div>
    <AuthHeader />
    <div class="login-page">
      <div class="login-page__wrapper">
        <FormWrapper>
          <h1 class="font--header">Hi There!</h1>
          <h2 class="font--header">Care to log in?</h2>
          <form
            novalidate
            @submit.prevent="submitForm"
            class="login-page__form"
          >
            <ul>
              <li :class="{ 'login-page__error--input': !!emailError }">
                <label class="font--label" for="email">Email </label>
                <input
                  required
                  @blur="isEmailTouched = true"
                  name="email"
                  type="email"
                  v-model="email"
                  placeholder="example@monterail.com"
                />
                <div class="login-page__error--message">{{ emailError }}</div>
              </li>

              <li :class="{ 'login-page__error--input': !!passwordError }">
                <password-input-show-hide
                  @touched="isPasswordTouched = true"
                  v-model="password"
                />
                <div class="login-page__error--message">
                  {{ passwordError }}
                </div>
              </li>
            </ul>

            <div class="login-page__buttons">
              <ui-button :disabled="!isFormValid" colors="brand"
                >Log in</ui-button
              >
              <ui-button
                class="login-page__buttons--register"
                empty
                borderless
                colors="brand"
              >
                <router-link :to="{ name: 'Register' }"
                  >Register instead</router-link
                >
              </ui-button>
            </div>
          </form>
        </FormWrapper>

        <p class="login-page__forgot">
          Forgot your password?
          <router-link :to="{ name: 'Register' }">Reset it now</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  margin: 64px 0;
  margin-inline: auto;
  max-width: 610px;
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

  &--error {
    input {
      border: 2px solid red;
    }
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

  &__buttons {
    margin: 67px 0;
  }

  &__buttons .button {
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
    font-weight: bold;
    color: var(--color-brand);
  }

  @include media-sm {
    &__wrapper {
      margin: 48px 24px 12px;
    }
  }

  @include media-md {
    h1,
    h2 {
      font-size: 80px;
      text-align: left;
    }

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

<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
import AuthHeader from "../components/AuthHeader.vue";

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";

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
      console.log(this.email, this.password);
      console.log(this.isEmailTouched);
      console.log(this.isPasswordTouched);
    },
    touchAll() {
      this.isEmailTouched = true;
      this.isPasswordTouched = true;
    },
  },
  computed: {
    emailError() {
      return validateEmail(this.email, this.isEmailTouched);
    },
    passwordError() {
      return validatePassword(this.password, this.isPasswordTouched);
    },
  },
  components: { UiButton, PasswordInputShowHide, AuthHeader },
};
</script>

<template>
  <div>
    <AuthHeader />
    <div class="login-page">
      <div class="login-page__wrapper">
        <h1 class="font--header">Hi There!</h1>
        <h2 class="font--header">Care to log in?</h2>
        <form novalidate @submit.prevent="submitForm" class="login-page__form">
          <ul>
            <li>
              <label class="font--label" for="email">Email </label>
              <input
                required
                @blur="isEmailTouched = true"
                name="email"
                type="email"
                v-model="email"
                placeholder="example@monterail.com"
              />
              <div class="login-page__error">{{ emailError }}</div>
            </li>

            <li>
              <password-input-show-hide
                @touched="isPasswordTouched = true"
                v-model="password"
              />
              <div class="login-page__error">{{ passwordError }}</div>
            </li>
          </ul>

          <div class="login-page__buttons">
            <ui-button :disabled="!isEmailTouched" colors="brand"
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
  max-width: 600px;
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

  &__wrapper {
    max-width: 600px;
    margin: 48px 24px 12px;
  }

  &__form label {
    display: block;
    margin: 10px 0;
    max-width: 100%;
  }

  &__error {
    margin-top: 10px;
    color: var(--color-error);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin-inline: auto;
    flex-direction: column;
  }

  input {
    background-color: #f7f7f7;
    border: 0;
    padding: 17.5px 24px;
    max-width: 100%;

    border-radius: 8px;

    &:hover {
      background-color: #eaeaea;
    }

    &::placeholder {
      color: var(--color-secondary);
    }

    &:focus,
    &:focus-visible {
      outline: none;
      outline: solid 2px #2f80ed;
      background-color: #ebf3fe;
    }
  }

  &__buttons {
    margin: 67px 0;
    button {
      &:disabled {
        background-color: var(--color-secondary);
        cursor: not-allowed;
      }
    }
  }

  .button {
    width: 100%;
    font-size: 1rem;
    padding: 0.95em 2em;
  }

  a {
    color: var(--color-brand);
    &:hover,
    &:focus {
      font-weight: bold;
    }
  }

  &__forgot {
    text-align: center;

    font-size: 16px;
    line-height: 170%;

    letter-spacing: 0.04em;
    color: #343541;
  }

  @include media-md {
    h1,
    h2 {
      font-size: 80px;
      text-align: left;
    }
    &__form {
      box-shadow: 0px 4px 22px rgba(52, 53, 65, 0.15);
      border-radius: 24px;
      padding: 64px;
      margin: 40px 0;
    }

    &__form li {
      padding: 10px 0;
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

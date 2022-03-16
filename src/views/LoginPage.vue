<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
import AuthHeader from "@/components/AuthHeader.vue";
import FormWrapper from "@/components/UI/FormWrapper.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: { status: false, message: "" },
      isEmailTouched: false,
      isPasswordTouched: false,
    };
  },
  methods: {
    async submitForm() {
      this.touchAll();
      if (this.isFormValid) {
        try {
          await this.$store.dispatch("user/login", {
            email: this.email,
            password: this.password,
          });
        } catch (error) {
          if (error.response.status === 401) {
            this.error = {
              status: true,
              message: "Invalid credentials",
            };
          } else {
            this.error = {
              status: true,
              message:
                "Something went wrong. Please recheck your details and try again.",
            };
          }
        }
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
  metaInfo: {
    title: "Screenings",
  },
  components: {
    UiButton,
    PasswordInputShowHide,
    AuthHeader,
    FormWrapper,
    ErrorMessage,
  },
};
</script>

<template>
  <div>
    <AuthHeader />
    <div class="login-page">
      <div class="login-page__wrapper">
        <h1 class="font--header">Hi There!</h1>
        <h2 class="font--header">Care to log in?</h2>
        <FormWrapper>
          <form
            novalidate
            @submit.prevent="submitForm"
            class="login-page__form"
          >
            <ErrorMessage v-if="error.status">{{ error.message }}</ErrorMessage>
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

            <div class="action-buttons">
              <UiButton :disabled="!isFormValid" colors="brand">
                Log in
              </UiButton>

              <router-link :to="{ name: 'Register' }">
                <UiButton empty borderless colors="brand">
                  Register instead
                </UiButton>
              </router-link>
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

  .error {
    margin: 0 0 1rem 0;
    font-size: 2.125rem;
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
    font-weight: bold;
    color: var(--color-brand);
  }

  @include media-md {
    h1,
    h2 {
      font-size: 80px;
      text-align: left;
    }

    &__forgot {
      text-align: left;
    }
  }
}
</style>

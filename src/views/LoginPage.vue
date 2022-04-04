<script lang="ts">
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
import AuthHeader from "@/components/AuthHeader.vue";
import FormWrapper from "@/components/UI/FormWrapper.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import emailPasswordTouched from "@/helpers/composables/emailPasswordTouched";
import {
  onMounted,
  computed,
  ref,
  ComputedRef,
  defineComponent,
} from "@vue/composition-api";
import getStore from "@/helpers/composables/store";
import router from "@/router";

export default defineComponent({
  setup() {
    const { email, password, isEmailTouched, isPasswordTouched } =
      emailPasswordTouched();

    const error = ref({ status: false, message: "" });
    const { store } = getStore();

    onMounted(() => {
      if (store.getters["user/isLoggedIn"]) {
        const redirectPath = store.getters.redirectTo;
        router.push(redirectPath);
      }
    });

    function touchAll() {
      isEmailTouched.value = true;
      isPasswordTouched.value = true;
    }

    const emailError: ComputedRef<string> = computed(() => {
      if (!isEmailTouched.value) return "";
      return email.value.length > 0 ? "" : "Email cannot be empty";
    });

    const passwordError: ComputedRef<string> = computed(() => {
      if (!isPasswordTouched.value) return "";
      return password.value.length > 0 ? "" : "Password cannot be empty";
    });

    const isFormValid: ComputedRef<boolean> = computed(() => {
      return !emailError.value && !passwordError.value;
    });

    async function submitForm() {
      touchAll();
      if (!isFormValid) return false;

      try {
        await store.dispatch("user/login", {
          email: email.value,
          password: password.value,
        });

        if (store.getters.redirect) {
          const redirectPath = store.getters.redirectTo;
          router.push(redirectPath);
        } else {
          router.push("/");
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          error.value = {
            status: true,
            message: "Invalid credentials",
          };
        } else {
          error.value = {
            status: true,
            message:
              "Something went wrong. Please recheck your details and try again.",
          };
        }
      }
    }

    return {
      email,
      password,
      isEmailTouched,
      isPasswordTouched,
      error,
      touchAll,
      emailError,
      passwordError,
      isFormValid,
      submitForm,
    };
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
});
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
                <UiButton transparent borderless colors="brand">
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

<style scoped lang="scss">
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

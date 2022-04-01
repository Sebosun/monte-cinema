<script lang="ts">
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";

import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";
import FormWrapper from "@/components/UI/FormWrapper.vue";

import { ref, computed, defineComponent } from "@vue/composition-api";

type ValidationType = "length" | "digits" | "letters";

export default defineComponent({
  setup(_, { emit }) {
    const email = ref("");
    const password = ref("");

    const isEmailTouched = ref(false);
    const isPasswordTouched = ref(false);

    function submitForm() {
      touchAll();
      if (isFormValid.value) {
        emit("submit", { email: email.value, password: password.value });
      }
    }

    function touchAll() {
      isEmailTouched.value = true;
      isPasswordTouched.value = true;
    }

    function getValidationClass(validationType: ValidationType) {
      const validator = passwordValidation.value[validationType];
      if (validator === false) return "";
      return validator ? "validated-form__info" : "validated-form__info--error";
    }

    const emailError = computed(() => {
      if (!isEmailTouched.value) return false;
      const emailValidation = validateEmail(email.value);
      return emailValidation ? emailValidation : "";
    });
    const passwordError = computed(() => {
      if (isPasswordTouched.value) return false;
      return validatePassword(password.value);
    });

    const passwordValidation = computed(() => {
      return {
        length: isPasswordTouched.value ? password.value.length > 8 : false,
        digits: isPasswordTouched.value ? !!password.value.match(/\d/) : false,
        letters: isPasswordTouched.value
          ? !!password.value.match(/[a-zA-Z]/)
          : false,
      };
    });

    const isFormValid = computed(() => {
      return !emailError.value && !passwordError.value;
    });

    return {
      submitForm,
      touchAll,
      getValidationClass,
      emailError,
      passwordError,
      passwordValidation,
      isFormValid,
    };
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

<script>
import FormWrapper from "@/components/UI/FormWrapper.vue";
import UiButton from "@/components/UI/UiButton.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import { ref, computed } from "@vue/composition-api";
import UserInformation from "@/helpers/composables/UserInformation";

export default {
  props: {
    error: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const {
      name,
      lastName,
      birthday,
      isFirstNameTouched,
      isLastNameTouched,
      isBirthdayTouched,
      firstNameError,
      lastNameError,
      birthdayError,
    } = UserInformation();

    const privacyPolicy = ref(false);
    const isPrivacyTouched = ref(false);

    function submitForm() {
      touchAll();
      emit("submit", {
        firstName: name.value,
        lastName: lastName.value,
        birthday: birthday.value,
      });
    }

    function touchAll() {
      isFirstNameTouched.value = true;
      isLastNameTouched.value = true;
      isBirthdayTouched.value = true;
      isPrivacyTouched.value = true;
    }

    const privacyError = computed(() => {
      if (!isPrivacyTouched.value) return "";
      return privacyPolicy.value === false ? "Privacy is required" : "";
    });

    const isFormValid = computed(() => {
      return (
        !birthdayError.value &&
        !lastNameError.value &&
        !firstNameError.value &&
        !privacyError.value
      );
    });

    return {
      name,
      lastName,
      birthday,
      privacyPolicy,
      isFirstNameTouched,
      isLastNameTouched,
      isBirthdayTouched,
      isPrivacyTouched,
      touchAll,
      submitForm,
      firstNameError,
      lastNameError,
      birthdayError,
      privacyError,
      isFormValid,
    };
  },
  components: { FormWrapper, UiButton, ErrorMessage },
};
</script>

<template>
  <FormWrapper class="user-info">
    <form @submit.prevent="submitForm" novalidate class="validated-form__form">
      <ul>
        <error-message v-if="error.status">{{ error.message }}</error-message>
        <li :class="{ 'user-info__error--input': !!firstNameError }">
          <label class="font--label" for="name">First Name</label>
          <input
            required
            @blur="isFirstNameTouched = true"
            name="name"
            type="text"
            v-model="name"
            placeholder="e.g. Jessica"
          />
          <div class="user-info__error--message">{{ firstNameError }}</div>
        </li>
        <li :class="{ 'user-info__error--input': !!lastNameError }">
          <label class="font--label" for="last name">Last Name</label>
          <input
            required
            @blur="isLastNameTouched = true"
            name="last name"
            type="text"
            v-model="lastName"
            placeholder="e.g. Walton"
          />
          <div class="user-info__error--message">{{ lastNameError }}</div>
        </li>

        <li :class="{ 'user-info__error--input': !!birthdayError }">
          <label class="font--label" for="birthday">Date of Birth</label>
          <input
            required
            @blur="isBirthdayTouched = true"
            name="birthday"
            type="date"
            v-model="birthday"
            placeholder="DD/MM/YYYY"
            data-date-split-input="true"
          />
          <div class="user-info__error--message">{{ birthdayError }}</div>
          <p class="user-info__age">You should be at least 18 years old</p>
        </li>

        <li
          class="user-info__privacy"
          :class="{ 'user-info__error--input': !!privacyError }"
        >
          <input
            v-model="privacyPolicy"
            name="privacy policy"
            @blur="isPrivacyTouched = true"
            type="checkbox"
          />
          <label for="privacy policy"
            >I accept the <span>Privacy Policy</span></label
          >
        </li>
        <div class="user-info__error--message">{{ privacyError }}</div>
      </ul>
      <div class="action-buttons">
        <UiButton :disabled="!isFormValid" colors="brand">Register</UiButton>
        <router-link :to="{ name: 'Login' }">
          <UiButton transparent borderless colors="brand">
            Log in instead
          </UiButton>
        </router-link>
      </div>
    </form>
  </FormWrapper>
</template>

<style scoped lang="scss">
.user-info {
  &__error {
    &--input input {
      border: 2px solid red;
    }
    &--message {
      margin-top: 10px;
      color: var(--color-error);
    }
  }

  .error {
    margin: 0 0 1rem 0;
    font-size: 2.125rem;
  }

  &__privacy {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    font-size: 18px;
    line-height: 21px;
  }

  // TODO stylize it more
  &__privacy input[type="checkbox"] {
    width: 1em;
    height: 1em;
    border: 0.55em solid currentColor;
    border-radius: 5.95em;
  }

  &__privacy span {
    text-decoration: underline;
  }

  &__age {
    font-size: 14px;
    color: #343541;
  }
}
</style>

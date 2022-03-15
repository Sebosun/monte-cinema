<script>
import FormWrapper from "@/components/UI/FormWrapper.vue";
import UiButton from "../UI/UiButton.vue";
export default {
  data() {
    return {
      name: "",
      lastName: "",
      birthday: "",
      privacyPolicy: false,
      isFirstNameTouched: false,
      isLastNameTouched: false,
      isBirthdayTouched: false,
      isPrivacyTouched: false,
    };
  },
  methods: {
    submitForm() {
      this.touchAll();
      if (this.isFormValid) {
        this.$emit("submit", {
          firstName: this.name,
          lastName: this.lastName,
          birthday: this.birthday,
        });
      }
    },
    touchAll() {
      this.isFirstNameTouched = true;
      this.isLastNameTouched = true;
      this.isBirthdayTouched = true;
      this.isPrivacyTouched = true;
    },
  },
  computed: {
    firstNameError() {
      if (!this.isFirstNameTouched) return "";
      return this.name.length > 0 ? "" : "First name cannot be empty";
    },
    lastNameError() {
      if (!this.isLastNameTouched) return "";
      return this.lastName.length > 0 ? "" : "Last name cannot be empty";
    },
    birthdayError() {
      if (!this.isBirthdayTouched) return "";
      return this.birthday === "" ? "Birthday is required" : "";
    },
    privacyError() {
      if (!this.isPrivacyTouched) return "";
      return this.privacyPolicy === false ? "Privacy is required" : "";
    },
    isFormValid() {
      return (
        !this.birthdayError &&
        !this.lastNameError &&
        !this.firstNameError &&
        !this.privacyError
      );
    },
  },
  components: { FormWrapper, UiButton },
};
</script>

<template>
  <FormWrapper class="user-info">
    <form @submit.prevent="submitForm" novalidate class="validated-form__form">
      <ul>
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
        <UiButton
          class="validated-form__buttons--register"
          empty
          borderless
          colors="brand"
        >
          <router-link :to="{ name: 'Login' }">Log in instead</router-link>
        </UiButton>
      </div>
    </form>
  </FormWrapper>
</template>

<style lang="scss" scoped>
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

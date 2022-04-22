<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";
import Vue from "vue";

import {
  ref,
  computed,
  defineComponent,
  onMounted,
} from "@vue/composition-api";
import UserInformationForm from "../chunks/UserInformationForm.vue";
import FormWrapper from "../UI/FormWrapper.vue";
import UiButton from "../UI/UiButton.vue";
import UserInformation from "@/helpers/composables/UserInformation";
import { showCurrentUser, updateCurrentUser } from "@/helpers/api/userActions";
import PasswordInputShowHide from "../chunks/PasswordInputShowHide.vue";

export default defineComponent({
  components: {
    MainHeader,
    FormWrapper,
    UiButton,
    UserInformationForm,
    PasswordInputShowHide,
  },
  setup() {
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

    const email = ref("");
    const isEmailTouched = ref(false);

    const passwordConfirm = ref("");
    const isPasswordConfirmTouched = ref(false);

    onMounted(async () => {
      const { data } = await showCurrentUser();
      name.value = data.first_name;
      lastName.value = data.last_name;
      email.value = data.email;
      birthday.value = data.date_of_birth;
    });

    const emailError = computed(() => {
      if (!isEmailTouched.value) return "";
      return email.value.length > 0 ? "" : "Last name cannot be empty";
    });

    const passwordConfirmError = computed(() => {
      if (!isPasswordConfirmTouched.value) return "";
      return email.value.length > 0 ? "" : "Last name cannot be empty";
    });

    const error = ref({ status: false, message: "" });

    function touchAll() {
      isFirstNameTouched.value = true;
      isLastNameTouched.value = true;
      isBirthdayTouched.value = true;
      isEmailTouched.value = true;
    }

    const isFormValid = computed(() => {
      return (
        !birthdayError.value &&
        !lastNameError.value &&
        !firstNameError.value &&
        !passwordConfirmError.value
      );
    });

    async function submitForm() {
      touchAll();
      if (isFormValid) {
        try {
          await updateCurrentUser({
            firstName: name.value,
            lastName: lastName.value,
            birthday: birthday.value,
            email: email.value,
            currentPassword: passwordConfirm.value,
          });
          Vue.notify({
            type: "success",
            title: "Success",
            text: "Changes applied succesfully",
            duration: 2000,
          });
          passwordConfirm.value = "";
        } catch (err: any) {
          Vue.notify({
            type: "error",
            title: "Error",
            text: "Something went wrong. Please try again later",
            duration: 2000,
          });
        }
      }
    }

    return {
      error,
      name,
      lastName,
      birthday,
      email,
      passwordConfirm,
      isPasswordConfirmTouched,
      isEmailTouched,
      isFirstNameTouched,
      isLastNameTouched,
      isBirthdayTouched,
      emailError,
      firstNameError,
      lastNameError,
      birthdayError,
      passwordConfirmError,
      submitForm,
    };
  },
});
</script>
<template>
  <section class="personal-details">
    <FormWrapper>
      <form
        @submit.prevent="submitForm"
        novalidate
        class="validated-form__form"
      >
        <ul>
          <error-message v-if="error.status">{{ error.message }}</error-message>
          <li
            :class="['personal-details__list', { 'error-input': !!emailError }]"
          >
            <label class="font--label" for="emai">Email</label>
            <input
              required
              @blur="isEmailTouched = true"
              name="email"
              type="text"
              v-model="email"
              placeholder="example@monterail.com"
            />
            <div class="error-message">{{ emailError }}</div>
          </li>
          <UiButton
            class="personal-details--button"
            small
            transparent
            colors="brand"
            role=""
            type="button"
          >
            Change password
          </UiButton>

          <li
            :class="[
              'personal-details__list',
              { 'error-input': !!firstNameError },
            ]"
          >
            <label class="font--label" for="name">First Name</label>
            <input
              required
              @blur="isFirstNameTouched = true"
              name="name"
              type="text"
              v-model="name"
              placeholder="e.g. Jessica"
            />
            <div class="error-message">{{ firstNameError }}</div>
          </li>
          <li
            :class="[
              'personal-details__list',
              { 'error-input': !!lastNameError },
            ]"
          >
            <label class="font--label" for="last name">Last Name</label>
            <input
              required
              @blur="isLastNameTouched = true"
              name="last name"
              type="text"
              v-model="lastName"
              placeholder="e.g. Walton"
            />
            <div class="error-message">{{ lastNameError }}</div>
          </li>

          <li
            :class="[
              'personal-details__list',
              { 'error-input': !!birthdayError },
            ]"
          >
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
            <div class="error-message">{{ birthdayError }}</div>
          </li>
          <li
            :class="[
              'personal-details__list',
              'personal-details__list--confirm',
              { 'error-input': !!passwordConfirmError },
            ]"
          >
            <password-input-show-hide
              @touched="isPasswordConfirmTouched = true"
              v-model="passwordConfirm"
              label="Confirm Password"
            />
          </li>
          <UiButton
            class="personal-details--submit"
            :disabled="!passwordConfirm"
            large
            colors="brand"
          >
            Save changes
          </UiButton>
        </ul>
      </form>
    </FormWrapper>
  </section>
</template>

<style scoped lang="scss">
.personal-details {
  --width-lg: 475px;

  &__list {
    max-width: var(--width-lg);
    margin-inline: 0;
    &--confirm {
      margin-top: 20px;
      label {
        font-size: 16px;
        color: var(--color-brand);
        font-size: bold;
      }
    }
  }

  &--submit {
    width: 100%;
    margin-top: 10px;
    max-width: var(--width-lg);
  }

  @include media-sm {
    display: flex;
    gap: 24px;
    justify-content: center;
    &__list {
      min-width: 300px;
    }
    &--submit {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";

import {
  ref,
  computed,
  defineComponent,
  onMounted,
} from "@vue/composition-api";

import MainHeader from "@/components/MainHeader.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
import UserInformationForm from "@/components/chunks/UserInformationForm.vue";

import UiButton from "@/components/UI/UiButton.vue";
import FormWrapper from "@/components//UI/FormWrapper.vue";

import { showCurrentUser, updateCurrentUser } from "@/helpers/api/userActions";

import useUserInformation from "@/helpers/composables/useUserInformation";
import useEmailPasswordTouched from "@/helpers/composables/useEmailPasswordTouched";

import { UserInformationModel } from "@/interfaces/UserTypes";

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
    } = useUserInformation();

    const {
      email,
      password: newPassword,
      isEmailTouched,
      isPasswordTouched: isNewPasswordTouched,
      emailError,
      passwordError: newPasswordError,
    } = useEmailPasswordTouched();

    const passwordConfirm = ref("");
    const isPasswordConfirmTouched = ref(false);

    const isPasswordBeingChanged = ref(false);

    onMounted(async () => {
      const { data }: { data: UserInformationModel } = await showCurrentUser();
      name.value = data.first_name;
      lastName.value = data.last_name;
      email.value = data.email;
      birthday.value = data.date_of_birth;
    });

    const passwordConfirmError = computed(() => {
      if (!isPasswordConfirmTouched.value) return "";
      return passwordConfirm.value.length > 0 ? "" : "Password cannot be empty";
    });

    const error = ref({ status: false, message: "" });

    const isFormValid = computed(() => {
      const areFieldsValid =
        !birthdayError.value &&
        !lastNameError.value &&
        !firstNameError.value &&
        !passwordConfirmError.value;
      if (isPasswordBeingChanged.value) {
        return areFieldsValid && !newPasswordError.value;
      } else {
        return areFieldsValid;
      }
    });

    function touchAll() {
      isFirstNameTouched.value = true;
      isLastNameTouched.value = true;
      isBirthdayTouched.value = true;
      isEmailTouched.value = true;
      isPasswordConfirmTouched.value = true;
      if (isPasswordBeingChanged) {
        isNewPasswordTouched.value = true;
      }
    }

    const cleanupAfterSubmit = () => {
      isFirstNameTouched.value = false;
      isLastNameTouched.value = false;
      isBirthdayTouched.value = false;
      isEmailTouched.value = false;
      isPasswordConfirmTouched.value = false;
      isPasswordBeingChanged.value = false;
      newPassword.value = "";
      passwordConfirm.value = "";
    };

    async function submitForm() {
      touchAll();
      if (isFormValid.value) {
        try {
          await updateCurrentUser({
            firstName: name.value,
            lastName: lastName.value,
            birthday: birthday.value,
            email: email.value,
            newPassword: isPasswordBeingChanged && newPassword.value,
            currentPassword: passwordConfirm.value,
          });
          Vue.notify({
            type: "success",
            title: "Success",
            text: "Changes applied succesfully",
            duration: 2000,
          });
          cleanupAfterSubmit();
        } catch (err: any) {
          console.log(err);
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
      newPassword,
      passwordConfirm,
      isPasswordBeingChanged,
      isPasswordConfirmTouched,
      isEmailTouched,
      isFirstNameTouched,
      isLastNameTouched,
      isBirthdayTouched,
      isNewPasswordTouched,
      isFormValid,
      newPasswordError,
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
            @click="isPasswordBeingChanged = !isPasswordBeingChanged"
            small
            transparent
            colors="brand"
            role=""
            type="button"
          >
            Change password
          </UiButton>

          <template v-if="isPasswordBeingChanged">
            <li
              :class="[
                'personal-details__list',
                'personal-details__list--confirm',
                { 'error-input': !!newPasswordError },
              ]"
            >
              <password-input-show-hide
                @touched="isNewPasswordTouched = true"
                v-model="newPassword"
                label="New Password"
              />
              <div class="error-message">{{ newPasswordError }}</div>
            </li>
          </template>

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
              label="Current Password"
            />
            <div class="error-message">{{ passwordConfirmError }}</div>
          </li>
          <UiButton
            class="personal-details--submit"
            :disabled="!isFormValid"
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
  &__list {
    max-width: var(--max-mobile-width);
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
    max-width: var(--max-mobile-width);
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

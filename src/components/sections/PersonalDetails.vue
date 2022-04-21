<script lang="ts">
import MainHeader from "@/components/MainHeader.vue";

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
import { showCurrentUser } from "@/helpers/api/userActions";

export default defineComponent({
  components: { MainHeader, FormWrapper, UiButton, UserInformationForm },
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

    const error = ref({ status: false, message: "" });

    function touchAll() {
      isFirstNameTouched.value = true;
      isLastNameTouched.value = true;
      isBirthdayTouched.value = true;
      isEmailTouched.value = true;
    }

    function submitForm() {
      touchAll();
      // do something, api i have doesnt have an update user method lol
    }

    return {
      error,
      name,
      lastName,
      birthday,
      email,
      isEmailTouched,
      isFirstNameTouched,
      isLastNameTouched,
      isBirthdayTouched,
      emailError,
      firstNameError,
      lastNameError,
      birthdayError,
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
            :class="[
              'personal-details__list',
              { 'user-info__error--input': !!emailError },
            ]"
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
            <div class="user-info__error--message">{{ emailError }}</div>
          </li>
          <UiButton
            class="personal-details--button"
            small
            transparent
            colors="brand"
            >Change password</UiButton
          >
          <li
            :class="[
              'personal-details__list',
              { 'user-info__error--input': !!firstNameError },
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
            <div class="user-info__error--message">{{ firstNameError }}</div>
          </li>
          <li
            :class="[
              'personal-details__list',
              { 'user-info__error--input': !!lastNameError },
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
            <div class="user-info__error--message">{{ lastNameError }}</div>
          </li>

          <li
            :class="[
              'personal-details__list',
              { 'user-info__error--input': !!birthdayError },
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
            <div class="user-info__error--message">{{ birthdayError }}</div>
            <p class="user-info__age">You should be at least 18 years old</p>
          </li>
          <UiButton
            class="personal-details--button"
            large
            colors="brand"
            disabled
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
    max-width: 350px;
    margin-inline: 0;
  }
  @include media-sm {
    display: flex;
    gap: 24px;
    justify-content: center;
    &__list {
      min-width: 300px;
    }
    :not(&--button:first-of-type) {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>

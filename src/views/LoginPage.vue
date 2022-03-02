<script>
import UiButton from "@/components/UI/UiButton.vue";
import PasswordInputShowHide from "@/components/chunks/PasswordInputShowHide.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.email, this.password);
    },
  },
  components: { UiButton, PasswordInputShowHide },
};
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="submitForm" class="login-page__form">
      <ul>
        <li>
          <label for="email">Email </label>
          <input
            name="email"
            type="email"
            v-model="email"
            placeholder="Something ending with @monterail.com"
          />
        </li>
        <li>
          <password-input-show-hide v-model="password" />
        </li>
      </ul>
      <ui-button colors="brand">Confirm</ui-button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
li {
  list-style-type: none;
}
label {
  display: block;
}

.login-page {
  margin: 0;
  padding: 0;
  &__form label {
    margin: 10px 0;
  }
}
</style>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isPasswordShown: false,
    };
  },
  methods: {
    togglePassword() {
      this.isPasswordShown = !this.isPasswordShown;
    },
  },
  computed: {
    passwordInputType() {
      return this.isPasswordShown ? "text" : "password";
    },
  },
};
</script>

<template>
  <label for="password"
    >Password
    <input
      name="password"
      :value="value"
      :type="passwordInputType"
      @input="$emit('input', $event.target.value)"
      placeholder="******"
    />
    <button empty colors="primary" @click.prevent="togglePassword">Show</button>
  </label>
</template>

<style scoped lang="scss"></style>

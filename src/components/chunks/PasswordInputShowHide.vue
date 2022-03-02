<script>
import EyeSvg from "../../assets/eye.svg";
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
  components: { EyeSvg },
};
</script>

<template>
  <label class="password-input font--label" for="password"
    >Password
    <input
      name="password"
      :value="value"
      :type="passwordInputType"
      @input="$emit('input', $event.target.value)"
      placeholder="******"
    />
    <button empty colors="primary" @click.prevent="togglePassword">
      <eye-svg />
    </button>
  </label>
</template>

<style scoped lang="scss">
.password-input {
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: relative;
}

button {
  position: absolute;
  top: 42%;
  right: max(3%);

  border: 0;
  background: inherit;
  & svg:hover,
  & svg:focus {
    cursor: pointer;
    fill: var(--color-background);
  }
}
</style>

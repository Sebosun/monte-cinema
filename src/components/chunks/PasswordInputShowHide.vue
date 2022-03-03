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
      required
      :value="value"
      :type="passwordInputType"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('touched')"
      placeholder="Enter your password"
    />
    <button
      type="button"
      class="password-input__svg"
      title="show password"
      @click.prevent="togglePassword"
    >
      <eye-svg />
    </button>
  </label>
</template>

<style scoped lang="scss">
.password-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__svg {
    border: none;
    padding: 0;
    background-color: inherit;
    position: relative;
    font: inherit;
    gap: 5px;

    cursor: pointer;
    svg {
      position: absolute;
      bottom: 20px;
      right: 3%;

      border: 0;
      background: inherit;
      &:hover,
      &:focus {
        cursor: pointer;
        fill: var(--color-background);
      }
    }
  }
}
</style>

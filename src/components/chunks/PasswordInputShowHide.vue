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
  <li>
    <label class="password-input font--label" for="password">Password</label>
    <input
      name="password"
      required
      :value="value"
      :type="passwordInputType"
      @input="$emit('input', $event.target.value)"
      placeholder="Enter your password"
    />
    <div class="password-input__svg" @click.prevent="togglePassword">
      <eye-svg />
    </div>
  </li>
</template>

<style scoped lang="scss">
.password-input__svg {
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: relative;
  font: inherit;

  cursor: pointer;
  & svg {
    position: absolute;
    bottom: 11px;
    right: 3%;

    border: 0;
    background: inherit;
    & svg:hover,
    & svg:focus {
      cursor: pointer;
      fill: var(--color-background);
    }
  }
}
</style>

<script>
import EyeSvg from "@/assets/eye.svg";
import { ref, computed } from "@vue/composition-api";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Password",
    },
  },
  setup() {
    const isPasswordShown = ref(false);

    function togglePassword() {
      isPasswordShown.value = !isPasswordShown.value;
    }

    const passwordInputType = computed(() => {
      return isPasswordShown.value ? "text" : "password";
    });

    return { isPasswordShown, togglePassword, passwordInputType };
  },
  components: { EyeSvg },
};
</script>

<template>
  <label class="password-input font--label" for="password">
    {{ label }}
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
  input {
    margin-top: 10px;
  }
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
      bottom: calc(1vh - 2px);
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

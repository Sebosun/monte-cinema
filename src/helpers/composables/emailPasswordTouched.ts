import { ref, computed, ComputedRef } from "@vue/composition-api";
import validateEmail from "@/helpers/validateEmail";
import validatePassword from "@/helpers/validatePassword";

export default function emailPasswordTouched() {
  const email = ref("");
  const password = ref("");
  const isEmailTouched = ref(false);
  const isPasswordTouched = ref(false);

  const emailError: ComputedRef<string> = computed(() => {
    if (!isEmailTouched.value) return "";
    const emailValidation = validateEmail(email.value);
    return emailValidation ? emailValidation : "";
  });

  const passwordError: ComputedRef<string> = computed(() => {
    if (!isPasswordTouched.value) return "";
    return validatePassword(password.value);
  });

  return {
    email,
    password,
    isEmailTouched,
    isPasswordTouched,
    emailError,
    passwordError,
  };
}

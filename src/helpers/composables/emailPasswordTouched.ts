import { ref, computed } from "@vue/composition-api";

export default function emailPasswordTouched() {
  const email = ref("");
  const password = ref("");
  const isEmailTouched = ref(false);
  const isPasswordTouched = ref(false);

  return {
    email,
    password,
    isEmailTouched,
    isPasswordTouched,
  };
}

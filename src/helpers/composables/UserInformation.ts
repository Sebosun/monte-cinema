import { ref, computed } from "@vue/composition-api";

export default function emailPasswordTouched() {
  const name = ref("");
  const lastName = ref("");
  const birthday = ref("");
  const isFirstNameTouched = ref(false);
  const isLastNameTouched = ref(false);
  const isBirthdayTouched = ref(false);

  const firstNameError = computed(() => {
    if (!isFirstNameTouched.value) return "";
    return name.value.length > 0 ? "" : "First name cannot be empty";
  });

  const lastNameError = computed(() => {
    if (!isLastNameTouched.value) return "";
    return lastName.value.length > 0 ? "" : "Last name cannot be empty";
  });

  const birthdayError = computed(() => {
    if (!isBirthdayTouched.value) return "";
    return birthday.value === "" ? "Birthday is required" : "";
  });

  return {
    name,
    lastName,
    birthday,
    isFirstNameTouched,
    isLastNameTouched,
    isBirthdayTouched,
    firstNameError,
    lastNameError,
    birthdayError,
  };
}

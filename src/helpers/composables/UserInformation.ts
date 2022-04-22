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
    if (birthday.value === "") return "Birthday is required";
    const userBirthday = new Date(birthday.value);
    const age = Math.trunc(
      (Date.now() - +userBirthday) / (24 * 3600 * 365.25 * 1000)
    );
    return age >= 18 ? "" : "You have to be at least 18 years old";
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

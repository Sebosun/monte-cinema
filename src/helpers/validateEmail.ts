export default function validateEmail(email: "string") {
  const re = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!re) {
    if (!email.includes("@")) return "Email must have a @ sign";
    if (email.split("@")[0] == "") return "The username cannot be empty!";
    if (!email.includes(".")) return "Please include domain name";
    return "Error, please re-check the input for errors";
  }
  return "";
}

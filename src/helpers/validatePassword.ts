export default function validatePassword(password: string) {
  // Anything with less than eight characters
  // OR anything with no numbers
  // OR or anything with no lowercase or uppercase char

  //if anything matches that, it means it's na invalid password
  const re = password.match(/^(.{0,7}|[^0-9]*|[^a-zA-Z]*)$/);
  // checks if there are any numbers
  const matchNumbers = password.match(/\d/);
  // checks if there are any letters
  const matchLetters = password.match(/[a-zA-Z]/);
  if (re) {
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!matchNumbers) return "Passowrd must have at least 1 number";
    if (!matchLetters) return "Your password must include letters";
    return "Error, please re-check the input for errors";
  }
  return "";
}

import validateEmail from "../../../src/helpers/validateEmail";

test("if valid email is detected", () => {
  const email = "monte@monterail.com";
  const expected = "";
  expect(validateEmail(email)).toBe(expected);
});

test("if valid email is detected 2", () => {
  const email = "monte@moigmail.com";
  const expected = "";
  expect(validateEmail(email)).toBe(expected);
});

test("if email lacks at sign", () => {
  const email = "monte monterail.com";
  const expected = "Email must have a @ sign";
  expect(validateEmail(email)).toBe(expected);
});

test("if username is lacking sign", () => {
  const email = "@monterail.com";
  const expected = "The username cannot be empty!";
  expect(validateEmail(email)).toBe(expected);
});

test("if email lacks domain name", () => {
  const email = "monte@monterailcom";
  const expected = "Please include domain name";
  expect(validateEmail(email)).toBe(expected);
});

import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import UserInformationForm from "@/components/chunks/UserInformationForm.vue";

const createComponent = ({ data } = {}) =>
  mount(UserInformationForm, {
    data() {
      return {
        ...data,
      };
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
    propsData: {
      error: {
        status: false,
        message: "",
      },
    },
  });

const findFirstName = (wrapper) => wrapper.find("[data-spec='name-input']");
const findLastName = (wrapper) => wrapper.find("[data-spec='last-name-input']");
const findBirthday = (wrapper) => wrapper.find('[name="birthday"]');
const findPrivacyPolicy = (wrapper) => wrapper.find("input[type='checkbox']");

const findFirstNameError = (wrapper) =>
  wrapper.find("[data-spec='first-name-error']");

const findLastNameError = (wrapper) =>
  wrapper.find("[data-spec='last-name-error']");

const findBirthdayError = (wrapper) =>
  wrapper.find("[data-spec='birthday-error']");

describe("User Information Form", () => {
  it("emits the data once correct data is entered", async () => {
    const wrapper = createComponent();

    const firstName = findFirstName(wrapper);
    const lastName = findLastName(wrapper);
    const birthday = findBirthday(wrapper);
    const privacyPolicy = findPrivacyPolicy(wrapper);

    firstName.setValue("Plotinus");
    lastName.setValue("Nous");
    birthday.setValue("1996-10-09");
    privacyPolicy.setChecked();

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const formSubmittedCalls = wrapper.emitted("submit");
    expect(formSubmittedCalls).toHaveLength(1);
  });
  it("emits the correct data", async () => {
    const wrapper = createComponent();

    const firstName = findFirstName(wrapper);
    const lastName = findLastName(wrapper);
    const birthday = findBirthday(wrapper);
    const privacyPolicy = findPrivacyPolicy(wrapper);

    firstName.setValue("Plotinus");
    lastName.setValue("Nous");
    birthday.setValue("1991-10-09");
    privacyPolicy.setChecked();

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const formSubmittedCalls = wrapper.emitted("submit");
    const expectedObject = {
      firstName: "Plotinus",
      lastName: "Nous",
      birthday: "1991-10-09",
    };
    expect(formSubmittedCalls[0][0]).toMatchObject(expectedObject);
  });

  it("trims the data passed", async () => {
    const wrapper = createComponent();

    const firstName = findFirstName(wrapper);
    const lastName = findLastName(wrapper);
    const birthday = findBirthday(wrapper);
    const privacyPolicy = findPrivacyPolicy(wrapper);

    firstName.setValue("    Aristocles");
    lastName.setValue("      Logistikon              ");
    birthday.setValue("1992-06-09");
    privacyPolicy.setChecked();

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    const formSubmittedCalls = wrapper.emitted("submit");
    const expectedObject = {
      firstName: "Aristocles",
      lastName: "Logistikon",
      birthday: "1992-06-09",
    };
    expect(formSubmittedCalls[0][0]).toMatchObject(expectedObject);
  });
});

describe("first name tests", () => {
  it("shows an error message if name is touched", async () => {
    const wrapper = createComponent({ data: { isFirstNameTouched: true } });

    await wrapper.vm.$nextTick();

    const firstNameErrorMessage = wrapper.find(
      "[data-spec='first-name-error']"
    );

    expect(firstNameErrorMessage.text()).toMatch("First name cannot be empty");
  });

  it("shows an error message if name is touched and empty string is passed", async () => {
    const wrapper = createComponent({ data: { isFirstNameTouched: true } });
    const firstName = findFirstName(wrapper);

    await firstName.setValue("                            ");

    await wrapper.vm.$nextTick();

    const firstNameErrorMessage = findFirstNameError(wrapper);

    expect(firstNameErrorMessage.text()).toMatch("First name cannot be empty");
  });

  it("shows no error message if is touched and data is correct", async () => {
    const wrapper = createComponent({ data: { isFirstNameTouched: true } });
    const firstName = findFirstName(wrapper);

    await firstName.setValue(" Ammonius");

    await wrapper.vm.$nextTick();

    const firstNameErrorMessage = findFirstNameError(wrapper);

    expect(firstNameErrorMessage.text()).toMatch("");
  });
});

describe("last name tests", () => {
  it("shows an error message if only lastName is touched", async () => {
    const wrapper = createComponent({ data: { isLastNameTouched: true } });
    const lastName = findLastName(wrapper);

    await lastName.setValue("                            ");

    await wrapper.vm.$nextTick();

    const lastNameError = findLastNameError(wrapper);

    expect(lastNameError.text()).toMatch("Last name cannot be empty");
  });

  it("shows an error message if lastName is touched and empty string is entered", async () => {
    const wrapper = createComponent({ data: { isLastNameTouched: true } });
    const lastName = findLastName(wrapper);

    await lastName.setValue("                            ");

    await wrapper.vm.$nextTick();

    const lastNameError = findLastNameError(wrapper);

    expect(lastNameError.text()).toMatch("Last name cannot be empty");
  });

  it("no error message if touched and data is valid", async () => {
    const wrapper = createComponent({ data: { isLastNameTouched: true } });
    const lastName = findLastName(wrapper);

    await lastName.setValue(" Plotinian");

    await wrapper.vm.$nextTick();

    const lastNameError = findLastNameError(wrapper);

    expect(lastNameError.text()).toMatch("");
  });
});

describe("birthday tests", () => {
  it("shows some error message if is touched and nothing is passed", async () => {
    const wrapper = createComponent({ data: { isBirthdayTouched: true } });
    const birthday = findBirthday(wrapper);

    birthday.setValue(" 1996-10-09");

    await wrapper.vm.$nextTick();

    const birthdayError = findBirthdayError(wrapper);

    expect(birthdayError.text()).not.toBe("");
  });

  it("verifies that user is at least 18 years old", async () => {
    const wrapper = createComponent({ data: { isBirthdayTouched: true } });
    const birthday = findBirthday(wrapper);

    birthday.setValue("2020-10-09");

    await wrapper.vm.$nextTick();

    const birthdayError = findBirthdayError(wrapper);

    expect(birthdayError.text()).toBe(
      "You have to be at least 18 years old to register on this site"
    );
  });

  it("verifies that user is at least 18 years old, close date", async () => {
    const wrapper = createComponent({ data: { isBirthdayTouched: true } });
    const birthday = findBirthday(wrapper);

    birthday.setValue("2004-01-01");

    await wrapper.vm.$nextTick();

    const birthdayError = findBirthdayError(wrapper);

    expect(birthdayError.text()).toBe("");
  });

  it("verifies that user is at least 18 years old, close date 2", async () => {
    const wrapper = createComponent({ data: { isBirthdayTouched: true } });
    const birthday = findBirthday(wrapper);

    birthday.setValue("2004-05-05");

    await wrapper.vm.$nextTick();

    const birthdayError = findBirthdayError(wrapper);

    expect(birthdayError.text()).toBe(
      "You have to be at least 18 years old to register on this site"
    );
  });
});

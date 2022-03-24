import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import EmailPasswordFormValidated from "@/components/chunks/EmailPasswordFormValidated.vue";

describe("Email Password Form", () => {
  xit("emits the form on submit", () => {
    const wrapper = mount(EmailPasswordFormValidated, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const input = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    input.setValue("Naruto");
    passwordInput.setValue("abecadlO1");

    wrapper.trigger("submit");

    const formSubmittedCalls = wrapper.emitted("formSubmitted");

    expect(formSubmittedCalls).toHaveLength(1);
  });
});

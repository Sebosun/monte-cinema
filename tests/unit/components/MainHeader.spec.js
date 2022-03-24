import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import MainHeader from "@/components/MainHeader.vue";

describe("Main Header", () => {
  xit("shows hamburger menu", () => {
    const wrapper = shallowMount(MainHeader, {
      data() {
        return {
          isMobileMenuVisible: true,
        };
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find("[data-spec='mobile-header']").isVisible()).toBe(true);
  });
});

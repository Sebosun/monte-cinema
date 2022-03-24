import { mount, shallowMount } from "@vue/test-utils";
import UiButton from "@/components/ui/UiButton.vue";

// const createComponent = () => mount(UiButton);
// const findButton = (wrapper) => wrapper.find("button");

describe("UiButton basic functionalities", () => {
  it("renders forwarded text", () => {
    const text = "Main content";
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "primary",
      },
      slots: {
        default: text,
      },
    });
    expect(wrapper.html()).toContain(text);
  });

  it("renders forwarded paragraph", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "primary",
      },
      slots: {
        default: "<p>Henlo</p>",
      },
    });
    expect(wrapper.html()).toContain("<p>Henlo</p>");
  });
});

describe("UiButton colors", () => {
  it("gets the correct brand color class with brand props", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
      },
    });
    expect(wrapper.classes()).toContain("button__brand");
  });

  it("correct primary color with primary props", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "primary",
      },
    });
    expect(wrapper.classes()).toContain("button__primary");
  });

  it("transparent background applies brand color only on font class", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        transparent: true,
      },
    });
    expect(wrapper.classes()).toContain("button--brand-font");
    expect(wrapper.classes()).toContain("button--transparent");
  });

  it("transparent background applies brand color only on font class", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "primary",
        transparent: true,
      },
    });
    expect(wrapper.classes()).toContain("button--primary-font");
    expect(wrapper.classes()).toContain("button--transparent");
  });
});

describe("Utility classes", () => {
  it("Applies small class if small props is true", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        small: true,
      },
    });
    expect(wrapper.classes()).toContain("button--sm");
  });

  it("Applies medium class if medium props is true", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        medium: true,
      },
    });
    expect(wrapper.classes()).toContain("button--md");
  });

  it("Applies large class if large props is true", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        large: true,
      },
    });
    expect(wrapper.classes()).toContain("button--lg");
  });

  it("Applies borderless class if borderless props is true", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        borderless: true,
      },
    });
    expect(wrapper.classes()).toContain("button--borderless");
  });

  it("Applies transparent class if transparent props is true", () => {
    const wrapper = mount(UiButton, {
      propsData: {
        colors: "brand",
        transparent: true,
      },
    });
    expect(wrapper.classes()).toContain("button--transparent");
  });
});

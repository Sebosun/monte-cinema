import { mount } from "@vue/test-utils";
import UiButton from "@/components/ui/UiButton.vue";

const createComponent = () => mount(UiButton);

const findButton = (wrapper) => wrapper.find("button");

describe("UiButton.vue", () => {
  it("renders slots", () => {});
});

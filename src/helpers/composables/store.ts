import { getCurrentInstance } from "@vue/composition-api";

export default function getStore() {
  const { proxy }: any = getCurrentInstance();
  const { $store: store } = proxy;

  return { store };
}

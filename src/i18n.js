import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "@/locales/en";
import pl from "@/locales/pl";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "en", //default starting locale
  fallbackLocale: "en", // locale when we do not find a message in current
  messages: {
    en,
    pl,
  },
});

import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "@/locales/en";
import pl from "@/locales/pl";

Vue.use(VueI18n);

const dateTimeFormats = {
  "en-UK": {
    shortDay: {
      weekday: "short",
    },
    short: {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    long: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    },
  },
  "pl-PL": {
    shortDay: {
      weekday: "short",
    },
    short: {
      weekday: "long",
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    },
  },
};

export default new VueI18n({
  locale: "en-UK",
  fallbackLocale: "en-UK",
  dateTimeFormats,
  messages: {
    "en-UK": en,
    "pl-PL": pl,
  },
});

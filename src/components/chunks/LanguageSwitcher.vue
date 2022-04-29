<script lang="ts">
import Vue from "vue";
import FlagOfPolandSVG from "@/components/FlagOfPolandSVG.vue";
import FlagUkSVG from "@/components/FlagUkSVG.vue";

export default Vue.extend({
  components: { FlagOfPolandSVG, FlagUkSVG },
  methods: {
    changeLocaleToPL() {
      localStorage.setItem("user-lang", "pl-PL");
      this.$i18n.locale = "pl-PL";
    },
    changeLocaleToUk() {
      localStorage.setItem("user-lang", "en-UK");
      this.$i18n.locale = "en-UK";
    },
  },
});
</script>

<template>
  <div class="language-switcher">
    <div @click="changeLocaleToPL">
      <FlagOfPolandSVG role="button" class="language-switcher__flag" />
    </div>
    <div @click="changeLocaleToUk">
      <FlagUkSVG role="button" class="language-switcher__flag" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  display: inline-flex;
  grid-gap: 10px;
  align-items: center;
  padding: 10px;
  background: #eaeaea;
  border-radius: 8px;

  &__flag {
    cursor: pointer;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}
</style>

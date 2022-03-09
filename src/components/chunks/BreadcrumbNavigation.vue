<script>
import UiButton from "@/components/UI/UiButton.vue";
import ArrowSVG from "@/assets/arrow.svg";
import ArrowRight from "@/assets/arrow-right.svg";
export default {
  components: { UiButton, ArrowSVG, ArrowRight },
  props: {
    backPath: {
      type: String,
      default: "/",
    },
    currentPathName: {
      type: String,
      default: "",
    },
    nestedName: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="breadcrumb-navigation">
    <router-link :to="backPath">
      <ui-button class="breadcrumb-navigation__button" empty colors="primary">
        <ArrowSVG />
        <div class="breadcrumb-navigation__button--text">Back</div>
      </ui-button>
    </router-link>
    <div class="breadcrumb-navigation__path">
      <div :class="{ focused: !!nestedName }">
        <slot />
      </div>
      <div v-if="nestedName" class="breadcrumb-navigation__path--nested">
        <ArrowRight />
        <div>{{ nestedName }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.focused {
  color: var(--color-brand);
}
.breadcrumb-navigation {
  display: flex;
  align-items: center;
  background-color: var(--color-rose);

  font-family: Roboto Mono;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: var(--color-primary);
  &__path {
    gap: 10px;
    display: flex;
    align-items: center;
    &--nested {
      gap: 10px;
      display: flex;
      align-items: center;
    }
  }

  @include media-sm {
    &__button {
      border: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      &--text {
        display: none;
      }
    }
  }

  @include media-md {
    padding: 24px;
    gap: 32px;
    &__button {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 8px 28px;
    }
  }
}
</style>

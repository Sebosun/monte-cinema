<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import HeaderActions from "./HeaderActions.vue";
export default {
  name: "MobileNavigation",
  components: { HeaderNavigation, HeaderActions },
};
</script>

<template>
  <div class="navigation--mobile">
    <HeaderNavigation />
    <HeaderActions />
  </div>
</template>

<style lang="scss">
.navigation--mobile {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px 10px 0 0;
  font-size: 16px;
  a {
    margin: 0;
    padding: 0;
  }
  button {
    background-color: #f7f7f7;
  }

  @include media-md {
    display: none;
    flex-grow: 1;
  }
}
</style>

<script>
export default {
  async created() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.$router.push("/");
  },
};
</script>

<template>
  <div class="not-found">
    <h1>404 Not found</h1>
    <p>You'll be redirected to the home page shortly</p>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  width: 100%;
  text-align: center;
  h1 {
    font-size: 64px;
  }
}
</style>

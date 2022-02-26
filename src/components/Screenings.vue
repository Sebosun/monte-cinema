<script>
export default {
  data() {
    return {
      posts: null,
      loading: true,
    };
  },
  async created() {
    const data = await this.fetchData();
    this.posts = data;
    this.loading = false;
  },
  methods: {
    async fetchData() {
      const data = await fetch("http://localhost:3000/movies");
      let dataJson = await data.json();
      return dataJson;
    },

    movieLength(length) {
      const hours = Math.floor(length / 60);
      let minutes = `0${length % 60}`;
      minutes = minutes.slice(-2);
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<template>
  <section>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <div>{{ post.title }}</div>
        <div>{{ movieLength(post.length) }}</div>
        <div>{{ post.genre.name }}</div>
        <div>{{ post.genre.poster_url }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

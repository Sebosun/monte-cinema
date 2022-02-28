<script>
export default {
  data() {
    return {
      movie: null,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async created() {
    this.movie = await this.fetchData();
  },
  methods: {
    //todo error handling lol
    async fetchData() {
      const data = await fetch(`http://localhost:3000/movies/${this.id}`);
      let dataJson = await data.json();
      return dataJson;
    },
  },
};
</script>

<template>
  <div>
    <h1>Movies :)</h1>
    <p>{{ id }}</p>
    <div v-if="movie">
      {{ JSON.stringify(movie) }}
    </div>
  </div>
</template>

<style scoped></style>

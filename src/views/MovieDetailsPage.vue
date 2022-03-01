<script>
import axios from "axios";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
export default {
  components: { ErrorMessage },
  data() {
    return {
      movie: null,
      loading: true,
      error: { status: false, message: "" },
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    try {
      const getMovie = await axios.get(
        `http://localhost:3000/movies/${this.id}`
      );
      this.movie = getMovie.data;
    } catch (err) {
      this.error = {
        status: true,
        message: "Unable to fetch movie. Please try again later.",
      };
    }
    this.loading = false;
  },
  methods: {},
};
</script>

<template>
  <div>
    <div v-if="loading">Loading....</div>
    <div v-else-if="error.status">
      <error-message>{{ error.message }}</error-message>
    </div>
    <div v-else>
      <p>{{ id }}</p>
      <pre v-if="movie">
        {{ movie }}
      </pre>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import DisplayMovies from "./DisplayMovies.vue";
import UiButton from "./UI/UiButton.vue";
export default {
  components: { UiButton, DisplayMovies },
  data() {
    return {
      posts: null,
      loading: true,
      selected: "",
    };
  },
  async created() {
    const data = await this.fetchData();
    this.posts = data;
    this.loading = false;
  },
  methods: {
    //todo error handling
    async fetchData() {
      const data = await fetch("http://localhost:3000/movies");
      let dataJson = await data.json();
      return dataJson;
    },
    // Returns date in H:MM or H:0M
  },
  computed: {
    genres() {
      if (this.posts) {
        const genres = this.posts.reduce((uniqueGenres, currentMovie) => {
          !uniqueGenres.includes(currentMovie.genre.name) &&
            uniqueGenres.push(currentMovie.genre);
          return uniqueGenres;
        }, []);
        return genres;
      } else {
        return [];
      }
    },
    filterMovies() {
      const filterMovies = this.posts.filter(
        (item) => item.genre.name === this.selected
      );
      // making sure something is actually selected
      return this.selected != "" ? filterMovies : this.posts;
    },
  },
};
</script>

<template>
  <section class="screenings">
    <div v-if="loading">Loading...</div>
    <div v-else class="screenings__wrapper">
      <div class="screenings__top">
        <div>
          <h1>Screenings:</h1>
          <h2>Friday 11/02/2022</h2>
        </div>
        <div class="screenings__filters">
          <div>
            <div>Day</div>
            <ui-button small colors="primary">Today</ui-button>
            <ui-button small empty colors="primary">Sat</ui-button>
            <ui-button small empty colors="primary">Sun</ui-button>
            <ui-button small empty colors="primary">Mon</ui-button>
          </div>
          <div>
            <div>Movie</div>
            <select v-model="selected">
              <option value="">All movies</option>
              <option
                v-for="genre in genres"
                :value="genre.name"
                :key="genre.id"
              >
                {{ genre.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- TODO: separate component -->
      <display-movies
        v-for="movie in filterMovies"
        class="screenings__movie"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </section>
</template>

<style lang="scss">
.screenings {
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 40px;
  &__movie {
    padding: 40px;
    display: grid;
    grid-template-columns: 98px 1fr; //gotta try minmax here
    gap: 40px;
  }
}
</style>

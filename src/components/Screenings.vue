<script>
import MovieCard from "./UI/MovieCard.vue";
import Tags from "./UI/Tags.vue";
import UiButton from "./UI/UiButton.vue";
export default {
  components: { MovieCard, UiButton, Tags },
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
    movieLength(length) {
      const hours = Math.floor(length / 60);
      const minutes = `0${length % 60}`.slice(-2);
      return `${hours}h ${minutes}`;
    },
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
    filterPosts() {
      const filterPosts = this.posts.filter(
        (item) => item.genre.name === this.selected
      );
      return this.selected != "" ? filterPosts : this.posts;
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
              <option disabled default value="">All movies</option>
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
      <movie-card
        v-for="post in filterPosts"
        :key="post.id"
        class="screenings__movie"
      >
        <img :src="post.poster_url" :alt="post.title" />
        <div class="screenings__card">
          <h2>{{ post.title }}</h2>
          <div class="screenings__info">
            <tags class="screenings__info--name">{{ post.genre.name }}</tags>
            <div class="screenings__info--len">
              {{ movieLength(post.length) }} min
            </div>
          </div>
          <ui-button empty small colors="brand">21:45</ui-button>
        </div>
      </movie-card>
    </div>
  </section>
</template>

<style scoped lang="scss">
.screenings {
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 40px;
  &__movie {
    padding: 40px;
    display: grid;
    grid-template-columns: 98px 1fr; //gotta try minmax here
    gap: 40px;
    img {
      height: max(132px);
      max-width: 100%;
      object-fit: cover;
    }
  }
  &__card {
    display: flex;
    flex-direction: column;
    h2 {
      margin: 0;
      padding: 0;
    }
    button {
      max-width: min-content;
      margin-top: auto;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    gap: 20px;
    &--len {
      font-size: 14px;
      color: var(--color-secondary);
    }
  }
}
</style>

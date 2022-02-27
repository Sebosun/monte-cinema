<script>
/* TODO - Calendar*/
/* TODO - Gaps*/
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
    //TODO error handling
    async fetchData() {
      const data = await fetch("http://localhost:3000/movies");
      let dataJson = await data.json();
      return dataJson;
    },
  },
  computed: {
    genres() {
      const genres = this.posts.reduce((uniqueGenres, currentMovie) => {
        !uniqueGenres.includes(currentMovie.genre.name) &&
          uniqueGenres.push(currentMovie.genre);
        return uniqueGenres;
      }, []);
      return genres;
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
        <div class="screenings__top--headers font--header">
          <h1>Screenings:</h1>
          <h2>Friday 11/02/2022</h2>
        </div>
        <div class="screenings__filters">
          <div class="screenings__filters--days">
            <div class="font--label">Day</div>
            <div class="screenings__buttons">
              <ui-button medium colors="primary">Today</ui-button>
              <ui-button medium empty colors="primary">Sat</ui-button>
              <ui-button medium empty colors="primary">Sun</ui-button>
              <ui-button medium empty colors="primary">Mon</ui-button>
            </div>
          </div>

          <div class="screenings__filters--genres">
            <div class="font--label">Movie</div>
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
  margin-top: 32px;
  &__top {
    &--headers {
      margin-bottom: 32px;
      h1 {
        padding: 0;
        margin: 0;
        font-weight: 600;
        font-size: 64px;
        line-height: 102%;
        letter-spacing: -0.01em;
      }
      h2 {
        color: var(--color-secondary);
        padding: 0;
        margin: 0;
        font-weight: 600;
        font-size: 64px;
        line-height: 102%;
        letter-spacing: -0.01em;
      }
    }
  }
  &__movie {
    padding: 40px;
    display: grid;
    grid-template-columns: 98px 1fr; //gotta try minmax here
    gap: 40px;
  }

  &__filters {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    gap: 40px;
    align-items: center;
    margin-bottom: 98px;

    .font--label {
      margin-bottom: 12px;
    }

    &--days {
      .button + .button {
        margin-left: 10px;
      }
      .screenings__buttons {
        font-size: 1rem;
      }
    }
    &--genres {
      flex: 1;
      max-width: 100%;
      select {
        width: 100%;
        align-self: stretch;
        background-color: #f7f7f7;
        border: 0;
        padding: 17.5px 0 17.5px 24px;
        margin-right: auto;
      }
    }
  }
}
</style>

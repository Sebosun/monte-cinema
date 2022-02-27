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
        <div class="screenings__headers font--header">
          <h1>Screenings:</h1>
          <h2>Friday 11/02/2022</h2>
        </div>
        <div class="screenings__filters">
          <div class="screenings__days">
            <div class="font--label">Day</div>
            <div class="screenings__buttons">
              <ui-button colors="primary">Today</ui-button>
              <ui-button empty colors="primary">Sat</ui-button>
              <ui-button empty colors="primary">Sun</ui-button>
              <ui-button empty colors="primary">Mon</ui-button>
              <ui-button empty colors="primary">Today</ui-button>
              <ui-button empty colors="primary">Sat</ui-button>
              <ui-button empty colors="primary">Sun</ui-button>
              <ui-button empty colors="primary">Mon</ui-button>
            </div>
          </div>

          <div class="screenings__genres">
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
@include media-sm {
  .screenings {
    margin-top: 88px;

    &__headers {
      margin-inline: 24px;
      margin-bottom: 32px;
    }

    &__headers h1 {
      padding: 0;
      margin: 0;
      font-size: 48px;
      font-weight: 600;
      line-height: 102%;
      letter-spacing: -0.01em;
    }

    &__headers h2 {
      color: var(--color-secondary);
      padding: 0;
      margin: 0;
      font-size: 48px;
      font-weight: 600;
      line-height: 102%;
    }

    &__filters {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-left: 24px;
      margin-bottom: 98px;
    }

    &__filters .font--label {
      margin-bottom: 12px;
    }

    &__filters .screenings__buttons {
      display: flex;
      padding: 12px 0;
      overflow: auto;
    }

    &__filters button {
      font-size: 14px;
      padding: 9px 24px;
    }

    &__days {
      display: flex;
      flex-direction: column;
    }

    &__days .button + .button {
      margin-left: 10px;
    }

    &__days .screenings__buttons {
      font-size: 1rem;
    }

    &__days .screenings__buttons:last-child {
      padding-right: 10px;
    }

    &__genres {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    &__genres select {
      margin-right: 24px;
      padding: 17.5px 24px 17.5px 24px;
      width: min(calc(100% - 24px), 24rem);

      border: 0;
      background-color: #f7f7f7;

      justify-self: center;
      align-self: center;
    }

    &__movie {
      padding: 40px;
      display: grid;
      grid-template-columns: 98px 1fr; //gotta try minmax here
      gap: 40px;
    }
  }
}

@include media-md {
  .screenings {
    margin-top: 32px;

    &__headers {
      margin-bottom: 32px;
    }

    &__headers h1 {
      padding: 0;
      margin: 0;
      font-weight: 600;
      font-size: 64px;
      line-height: 102%;
      letter-spacing: -0.01em;
    }

    &__headers h2 {
      color: var(--color-secondary);
      padding: 0;
      margin: 0;
      font-weight: 600;
      font-size: 64px;
      line-height: 102%;
      letter-spacing: -0.01em;
    }

    &__filters {
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      gap: 40px;
      align-items: center;
      margin-bottom: 98px;
    }

    &__filters .font--label {
      margin-bottom: 12px;
    }

    &__days .button + .button {
      margin-left: 10px;
    }

    &__days .screenings__buttons {
      font-size: 1rem;
    }

    &__genres {
      flex: 1;
      max-width: 100%;
    }

    &__genres select {
      width: 100%;
      align-self: stretch;
      background-color: #f7f7f7;
      border: 0;
      padding: 17.5px 0 17.5px 24px;
      margin-right: auto;
    }

    &__movie {
      padding: 40px;
      display: grid;
      grid-template-columns: 98px 1fr; //gotta try minmax here
      gap: 40px;
    }
  }
}
</style>

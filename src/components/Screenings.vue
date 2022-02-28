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
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </section>
</template>

<style lang="scss">
.screenings {
  margin-top: 5.5rem;

  &__headers {
    margin-inline: 1.5rem;
    margin-bottom: 2rem;
  }

  &__headers h1 {
    padding: 0;
    margin: 0;
    font-size: 3rem;
    font-weight: 600;
    line-height: 102%;
    letter-spacing: -0.01em;
  }

  &__headers h2 {
    color: var(--color-secondary);
    padding: 0;
    margin: 0;
    font-size: 3rem;
    font-weight: 600;
    line-height: 102%;
  }

  &__filters {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-left: 1.5rem;
    margin-bottom: 6.125rem;
  }

  &__filters .font--label {
    margin-bottom: 0.75rem;
  }

  &__days {
    display: flex;
    flex-direction: column;
  }

  &__buttons .button + .button {
    margin-left: 0.625rem;
  }

  &__days &__buttons {
    font-size: 1rem;
    padding: 0.75rem 0;
    display: flex;
    overflow: auto;
  }

  &__buttons button {
    font-size: 0.875rem;
    padding: 0.5625rem 1.5rem;
  }

  &__days .screenings__buttons:last-child {
    padding-right: 0.625rem;
  }

  &__genres {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__genres select {
    width: min(calc(100% - 1.5rem), 29.25rem);
    margin-right: 1.5rem;
    padding: 1.094rem 1.5rem 1.094rem 1.5rem;

    border: 0;
    background-color: #f7f7f7;
  }
}

@include media-md {
  .screenings {
    &__headers h2 {
      font-size: 64px;
    }

    &__headers h1 {
      font-size: 64px;
    }

    &__filters {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    // select children starting from 5 +
    &__buttons .button:nth-child(n + 5) {
      display: none;
    }

    &__buttons button {
      padding: 19px 40px;
      font-size: 18px;
    }

    &__genres {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      justify-content: space-between;
    }

    &__genres .font--label {
      font-size: 14px;
      justify-self: flex-start;
    }

    &__genres select {
      margin: 12px 0;
    }
  }
}
</style>

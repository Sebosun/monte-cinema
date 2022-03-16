<script>
// TODO calendar but thats at some other point
import MovieCard from "@/components/UI/MovieCard.vue";
import Tags from "@/components/UI/Tags.vue";
import UiButton from "@/components/UI/UiButton.vue";

export default {
  components: { MovieCard, Tags, UiButton },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    screenings: {
      type: Array,
      required: true,
    },
  },
  computed: {
    screeningsWithDatesObjects() {
      return this.screenings.map((screening) => {
        const screeningDate = new Date(screening.datetime);

        return { ...screening, datetime: screeningDate };
      });
    },
  },
  methods: {
    movieLength(length) {
      const hours = Math.floor(length / 60);
      const minutes = `0${length % 60}`.slice(-2);
      return `${hours}h ${minutes}`;
    },
    getScreeningHour(date) {
      const hours = date.getHours();
      const minutes = `0${date.getMinutes()}`.slice(-2);
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<template>
  <MovieCard v-if="screenings.length > 1" class="list-one-movie">
    <div class="list-one-movie__wrapper">
      <div class="list-one-movie__fill">
        <img :src="movie.poster_url" :alt="movie.title" />
      </div>
      <div class="list-one-movie__card">
        <h2>{{ movie.title }}</h2>
        <div class="list-one-movie__info">
          <Tags class="list-one-movie__info--name">{{ movie.genre.name }}</Tags>
          <div class="list-one-movie__info--len">
            {{ movieLength(movie.length) }} min
          </div>
        </div>

        <div class="list-one-movie__buttons--md-screen">
          <ui-button
            v-for="screening in screeningsWithDatesObjects"
            :key="screening.id"
            empty
            colors="brand"
            >{{ getScreeningHour(screening.datetime) }}</ui-button
          >
        </div>
      </div>
    </div>
    <div class="list-one-movie__buttons--sm-screen">
      <ui-button
        v-for="screening in screeningsWithDatesObjects"
        :key="screening.id"
        empty
        colors="brand"
        >{{ getScreeningHour(screening.datetime) }}</ui-button
      >
    </div>
  </MovieCard>
</template>

<style scoped lang="scss">
.list-one-movie {
  &__wrapper {
    margin-bottom: 1rem;
  }

  &__fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    float: left;
    margin-right: 0.625rem;
  }

  &__fill img {
    max-height: 4.25rem;
    min-width: 4.25rem;
    object-fit: cover;
    object-position: center;

    margin-bottom: auto;
  }

  &__card {
    display: flex;
    flex-direction: column;
  }

  &__card h2 {
    font-size: 1.5rem;
    margin: 0;
    padding-bottom: 0.5rem;

    white-space: nowrap;
    display: flex;
    overflow: auto;
  }

  &__info {
    margin-bottom: 0.5rem;
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  &__buttons--sm-screen {
    width: 100%;
    padding: 0.625rem 0;
    max-width: min-content;
    margin: 0;
    display: flex;
    overflow-x: auto;
  }

  &__buttons--md-screen {
    display: none;
  }

  &__buttons--sm-screen button {
    padding: 0.3125rem 1rem;
  }

  &__buttons--sm-screen button + button {
    margin-left: 0.5rem;
  }

  &__info &__info--len {
    font-size: 0.875rem;
    color: var(--color-secondary);
  }

  @include media-md {
    padding: 2rem 1rem;
    margin-bottom: 1rem;

    &__wrapper {
      display: grid;
      gap: 40px;
      grid-template-columns: minmax(100px, 10%) 90%;
      margin: 0;
    }

    &__card h2 {
      font-size: 24px;
    }

    &__fill {
      float: none;
      justify-content: center;
      height: 100%;
    }

    &__fill img {
      max-height: 100%;
      max-width: 100%;
      margin: 0;
    }

    &__buttons--sm-screen {
      display: none;
    }

    &__buttons--md-screen {
      margin-top: auto;
      display: flex;
      gap: 8px;
      flex-direction: row;
    }
    &__buttons--md-screen button {
      padding: 12px 32px;
    }
  }
}
</style>

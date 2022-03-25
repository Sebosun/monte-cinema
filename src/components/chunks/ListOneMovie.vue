<script>
import MovieCard from "@/components/UI/MovieCard.vue";
import Tags from "@/components/UI/Tags.vue";
import ButtonsScreenings from "./ButtonsScreenings.vue";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    screenings: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    movieLength(length) {
      const hours = Math.floor(length / 60);
      const minutes = `0${length % 60}`.slice(-2);
      return `${hours}h ${minutes}`;
    },
  },
  computed: {
    screeningsWithDates() {
      return this.screenings.map((screening) => {
        const screeningDate = new Date(screening.datetime);

        return { ...screening, datetime: screeningDate };
      });
    },
    isComponentVisible() {
      return this.screenings.length >= 1 || this.show;
    },
  },

  components: { MovieCard, Tags, ButtonsScreenings },
};
</script>

<template>
  <MovieCard v-if="isComponentVisible" class="list-one-movie">
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
          <slot>
            <ButtonsScreenings
              :screeningsWithDates="screeningsWithDates"
              class="list-one-movie__buttons--md-screen"
            />
          </slot>
        </div>
      </div>
    </div>

    <div class="list-one-movie__buttons--sm-screen">
      <slot>
        <ButtonsScreenings
          :screeningsWithDates="screeningsWithDates"
          class="list-one-movie__buttons--sm-screen"
        />
      </slot>
    </div>
  </MovieCard>
</template>

<style lang="scss">
.list-one-movie {
  &__wrapper {
    margin: 1rem 0;
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

    display: flex;
    overflow: auto;
    white-space: nowrap;
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
    margin-top: -20px;
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
    margin-inline: 0.5rem;
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

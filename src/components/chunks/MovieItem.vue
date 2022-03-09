<script>
import Tags from "@/components/UI/Tags.vue";
import MovieCard from "@/components/UI/MovieCard.vue";
import movieLengthMinutesToHuman from "@/helpers/movieLengthMinutesToHuman.js";
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    movieLength(length) {
      return movieLengthMinutesToHuman(length);
    },
  },
  components: { MovieCard, Tags },
};
</script>

<template>
  <movie-card class="movie-item">
    <div class="movie-item__meta">
      <router-link :to="`movies/${movie.id}`">
        <h2 class="font--bold">
          {{ movie.title }}
        </h2>
      </router-link>
      <div class="movie-item__length font--bold">
        {{ movieLength(movie.length) }}
      </div>
    </div>
    <div class="movie-item__image">
      <img :src="movie.poster_url" :alt="movie.title" />
    </div>
    <Tags class="">{{ movie.genre.name }}</Tags>
  </movie-card>
</template>

<style scoped lang="scss">
img {
  max-height: 195px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  object-position: center;
}
h2 {
  margin: 0;
  font-size: 36px;
  font-family: Roboto;
  line-height: 42px;
  font-weight: bold;
}

.movie-item {
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 192px 30px;
  max-width: 100%;
  gap: 20px;
  padding: 24px;

  &__meta {
    @include media-sm {
      max-width: 340px;
    }
    max-width: 440px;
  }

  &__meta h2 {
    overflow: auto;
  }

  &__length {
    color: var(--color-secondary);
  }

  @include media-md {
    display: grid;
    grid-template-rows: 1fr 190px 30px;
    gap: 10px;
    padding: 24px;

    &__meta {
      display: flex;
      gap: 8px;
      flex-flow: column;
    }
    &__meta div {
      margin-top: auto;
    }
    &__image {
      overflow: hidden;
      img {
        object-position: 50% 20%;
      }
    }
  }
}
</style>

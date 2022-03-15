<script>
import Tags from "@/components/UI/Tags.vue";
import movieLengthMinutesToHuman from "@/helpers/movieLengthMinutesToHuman";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    movieLength() {
      return movieLengthMinutesToHuman(this.movie.length);
    },
  },
  components: { Tags },
};
</script>

<template>
  <div class="movie-details__desc">
    <div class="movie-details__meta">
      <h1 class="font--header">{{ movie.title }}</h1>
      <div class="movie-details__meta--misc">
        <Tags>{{ movie.genre.name }}</Tags>
        <div class="font--bold">{{ movie.release_date.split("-")[0] }}</div>
        <div class="font--bold">{{ movieLength }}</div>
        <div class="font--bold">R</div>
      </div>
      <p>
        {{ movie.description }}
      </p>
    </div>
    <div class="movie-details__image">
      <img :src="movie.poster_url" :alt="movie.title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.font--bold {
  color: var(--color-secondary);
}

h1 {
  color: var(--color-primary);
}

p {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 170%;
}

.movie-details {
  &__meta {
    margin-top: 20px;
    display: flex;
    flex-flow: column;
    gap: 32px;
    &--misc {
      display: flex;
      gap: 5px;
      align-items: center;
      /* done just so the dots are evenly spaceed */
      div {
        &:nth-child(n + 3) {
          &:before {
            padding-inline: 4px;
            content: "  \2022";
          }
        }
        &:nth-child(n + 2) {
          margin-right: -4px;
        }
      }
    }
  }

  &__image {
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  &__image img {
    position: absolute;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  @include media-sm {
    &__desc,
    &__meta {
      margin-inline: 24px;
    }

    h1 {
      font-size: 48px;
      margin: 0;
    }

    &__desc {
      margin: 64px 0;
      display: grid;
      grid-template-rows: 1fr minmax(340px, 1fr);
      .movie-details__image {
        grid-row: 1;
      }
      gap: 28px;
    }
  }

  @include media-md {
    p {
      font-size: 24px;
      margin-bottom: auto;
    }
    h1 {
      font-size: 80px;
      margin: 0;
    }

    &__desc {
      margin: 64px 0;
      display: grid;
      grid-template-columns: 1fr minmax(340px, 1fr);
      gap: 28px;
    }
  }
  @include media-lg {
    &__desc {
      grid-template-columns: 1fr minmax(600px, 1fr);
      gap: 70px;
    }
  }
}
</style>

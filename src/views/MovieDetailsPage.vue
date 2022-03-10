<script>
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import MainHeader from "@/components/MainHeader.vue";
import BreadcrumbNavigation from "@/components/chunks/BreadcrumbNavigation.vue";
import Tags from "../components/UI/Tags.vue";
import movieLengthMinutesToHuman from "@/helpers/movieLengthMinutesToHuman.js";
import { getOneMovie } from "@/helpers/api/movies";
export default {
  components: { ErrorMessage, MainHeader, BreadcrumbNavigation, Tags },
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
      const response = await getOneMovie(this.id);
      this.movie = response.data;
    } catch (err) {
      this.error = {
        status: true,
        message: "Unable to fetch movie. Please try again later.",
      };
    }
    this.loading = false;
  },
  computed: {
    movieLength() {
      return movieLengthMinutesToHuman(this.movie.length);
    },
  },
};
</script>

<template>
  <div class="movie-details">
    <MainHeader />
    <div v-if="loading">Loading....</div>
    <div v-else-if="error.status">
      <error-message>{{ error.message }}</error-message>
    </div>
    <div v-else>
      <BreadcrumbNavigation :nestedName="movie.title"
        >Movies</BreadcrumbNavigation
      >
      <div class="movie-details__desc">
        <div class="movie-details__meta">
          <h1 class="font--header">{{ movie.title }}</h1>
          <div class="movie-details__meta--misc">
            <Tags>{{ movie.genre.name }}</Tags>
            <div class="font--bold">1987</div>
            <div class="font--bold">{{ movieLength }}</div>
            <div class="font--bold">R</div>
          </div>
          <p>
            A team of commandos on a mission in a Central American jungle find
            themselves hunted by an extraterrestrial warrior
          </p>
        </div>
        <div class="movie-details__image">
          <img :src="movie.poster_url" :alt="movie.title" />
        </div>
      </div>
      <div>Screeningsn</div>
      <!--TODO: Once the api arrives add the thing-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.font--bold {
  color: var(--color-secondary);
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
    img {
      height: 500px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  h1 {
    color: var(--color-primary);
  }
  @include media-sm {
    h1 {
      font-size: 48px;
      margin: 0;
    }
  }

  @include media-md {
    p {
      font-size: 24px;
      margin-top: auto;
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

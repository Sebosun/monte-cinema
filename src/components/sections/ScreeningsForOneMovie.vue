<script>
/* TODO - Calendar*/
import OneMovieScreening from "@/components/chunks/OneMovieScreening.vue";
import UiButton from "@/components/UI/UiButton.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import * as moviesApi from "@/helpers/api/movies";
export default {
  data() {
    return {
      selected: "",
      selectedDay: new Date(),
      screenings: [],
      loading: true,

      error: {
        status: false,
        message: "Something went wrong. Please try again",
      },
    };
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  async created() {
    try {
      const seances = await this.getSingleSeance(this.movie.id);
      this.screenings = seances;
      this.loading = false;
    } catch {
      this.loading = false;
      this.error = {
        status: true,
        message: "Something went wrong. Please try again",
      };
    }
  },
  methods: {
    dayToHuman(date) {
      var options = { weekday: "long" };
      const day = new Intl.DateTimeFormat("en-US", options).format(date);
      return day;
    },
    async getSingleSeance(id) {
      const response = await moviesApi.getSeancesByMovieId(id);
      return response.data;
    },
  },
  computed: {
    selectedDayScreenings() {
      return this.screenings.reduce((todaysScreenings, screening) => {
        const screeningDate = new Date(screening.datetime);
        if (screeningDate.toDateString() === this.selectedDay.toDateString()) {
          todaysScreenings.push({
            hall: screening.hall,
            id: screening.id,
            movie: screening.movie,
            datetime: screeningDate,
          });
        }
        return todaysScreenings;
      }, []);
    },
    switchScreeningsDays() {
      const UNIX_ONE_DAY = 24 * 3600 * 1000; //one day
      const today = new Date();
      const datesArr = [today];
      for (let i = 0; i < 6; i++) {
        let lastItem = datesArr[datesArr.length - 1];
        datesArr.push(new Date(lastItem.getTime() + UNIX_ONE_DAY));
      }
      return datesArr;
    },
    currentScreeningsText() {
      return `${this.dayToHuman(
        this.selectedDay
      )} ${this.selectedDay.toLocaleDateString("en-UK")}`;
    },
  },
  components: { UiButton, OneMovieScreening, ErrorMessage, LoadingSpinner },
};
</script>

<template>
  <section class="screenings">
    <div v-if="loading" class="screenings__loading"><LoadingSpinner /></div>
    <div v-else-if="error.status" class="screenings__error">
      <ErrorMessage>{{ error.message }}</ErrorMessage>
    </div>

    <div v-else class="screenings__wrapper">
      <div class="screenings__top">
        <div class="screenings__headers font--header">
          <h1>Screenings:</h1>
          <h2>{{ currentScreeningsText }}</h2>
        </div>
        <div class="screenings__filters">
          <div class="screenings__days">
            <div class="font--label">Day</div>
            <div class="screenings__buttons">
              <ui-button
                v-for="(date, index) in switchScreeningsDays"
                @click="selectedDay = date"
                :key="index"
                :empty="!(date.toDateString() === selectedDay.toDateString())"
                colors="primary"
                >{{ dayToHuman(date) }}</ui-button
              >
            </div>
          </div>
        </div>
      </div>
      <OneMovieScreening
        :screenings="selectedDayScreenings"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </section>
</template>

<style lang="scss">
.screenings {
  margin-top: 5.5rem;

  &__loading {
    text-align: center;
    margin-inline: auto;
    margin-bottom: 5rem;
  }

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
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    // select children starting from 5 +
    &__buttons .button:nth-child(n + 5) {
      display: none;
    }

    &__buttons button {
      padding: 19px 40px;
      font-size: 18px;
    }

    &__genres select {
      width: 100%;
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

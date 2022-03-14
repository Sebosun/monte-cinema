<script>
/* TODO - Calendar*/
import ListOneMovie from "@/components/chunks/ListOneMovie.vue";
import UiButton from "@/components/UI/UiButton.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import getGenres from "@/helpers/getGenres";
import dateToHumanReadableDay from "@/helpers/dateToHumanReadableDay";
import CalendarSVG from "@/assets/calendar.svg";

export default {
  data() {
    return {
      selectedGenre: "",
      modelConfig: {
        type: "Date",
      },
    };
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
    selectedDay: {
      type: Date,
      required: true,
    },
    empty: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    dayToHuman(day) {
      return dateToHumanReadableDay(day);
    },
    emitDayUpdate(event) {
      this.$emit("changeDate", new Date(event));
    },
  },
  computed: {
    // TODO Move loading/error states into parent component
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    genres() {
      return getGenres(this.movies);
    },
    filterMovies() {
      const filteredMovies = this.movies.filter(
        (item) => item.genre.name === this.selectedGenre
      );
      // making sure something is actually selected
      return this.selectedGenre == "" ? this.movies : filteredMovies;
    },
    datesForDaySwitchingButtons() {
      const UNIX_ONE_DAY = 24 * 3600 * 1000; //one day
      const today = new Date();
      const datesArr = [today];
      for (let i = 0; i < 4; i++) {
        let lastItem = datesArr[datesArr.length - 1];
        datesArr.push(new Date(lastItem.getTime() + UNIX_ONE_DAY));
      }
      return datesArr;
    },
    currentScreeningsText() {
      var options = { weekday: "long" };
      const dayStr = new Intl.DateTimeFormat("en-UK", options).format(
        this.selectedDay
      );
      return `${dayStr} ${this.selectedDay.toLocaleDateString("en-UK")}`;
    },
  },
  components: {
    UiButton,
    ListOneMovie,
    ErrorMessage,
    LoadingSpinner,
    CalendarSVG,
  },
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
                v-for="(date, index) in datesForDaySwitchingButtons"
                @click="$emit('changeDate', date)"
                :key="index"
                :empty="!(date.toDateString() === selectedDay.toDateString())"
                colors="primary"
                >{{ dayToHuman(date) }}</ui-button
              >
              <div class="screenings__calendar">
                <vc-date-picker :value="selectedDay" @input="emitDayUpdate">
                  <template v-slot="{ togglePopover }">
                    <ui-button @click="togglePopover()" empty colors="primary">
                      <CalendarSVG />
                    </ui-button>
                  </template>
                </vc-date-picker>
              </div>
            </div>
          </div>

          <div v-if="movies.length > 1" class="screenings__genres">
            <label for="genres" class="font--label">Movie</label>
            <select name="genres" v-model="selectedGenre">
              <option selected value="">All movies</option>
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
      <ListOneMovie
        v-for="movie in filterMovies"
        :screenings="movie.screenings"
        :key="movie.id"
        :movie="movie"
      />
      <template v-if="empty">
        <error-message>No screenings found for this day </error-message>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.screenings {
  margin: 5.5rem 0;

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

  &__buttons .button + .button {
    margin-left: 0.625rem;
  }

  &__buttons {
    font-size: 1rem;
    padding: 0.75rem 0;
    display: flex;
    overflow: auto;
  }
  &__buttons button {
    font-size: 0.875rem;
    padding: 19px 40px;
    @include media-sm {
      font-size: 14px;
      padding: 9px 24px;
    }
  }

  &__calendar {
    display: inline-block;
    margin: auto 10px;
    button {
      padding: 12px 16px;
      @include media-sm {
        font-size: 14px;
        padding: 2px 4px;
      }
    }
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

    &__buttons button {
      font-size: 18px;
    }

    &__genres {
      justify-content: space-around;
    }

    &__genres select {
      margin: 0;
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

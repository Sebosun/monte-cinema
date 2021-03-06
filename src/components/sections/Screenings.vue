<script lang="ts">
import Vue, { PropType } from "vue";
import ListOneMovie from "@/components/chunks/ListOneMovie.vue";
import UiButton from "@/components/UI/UiButton.vue";
import ErrorMessage from "@/components/UI/ErrorMessage.vue";
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue";
import DropdownSelect from "@/components/chunks/DropdownSelect.vue";

import {
  ONE_DAY_IN_MILLISECONDS,
  dateToHumanReadableDay,
} from "@/helpers/timeUtils";

import CalendarSVG from "@/assets/calendar.svg";
import getGenres from "@/helpers/getGenres";

interface genreObj {
  name: string;
  id: number;
}

import { movieWithScreenings } from "@/interfaces/MovieTypes";

import { Error } from "./AllScreeningsLogic.vue";

export default Vue.extend({
  data() {
    return {
      selectedGenre: "",
    };
  },
  props: {
    movies: {
      type: Array as PropType<movieWithScreenings[]>,
      required: true,
    },
    selectedDay: {
      type: Date as PropType<Date>,
      required: true,
    },
    empty: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    error: {
      type: Object as PropType<Error>,
      required: true,
    },
  },
  methods: {
    dayToHuman(day: Date) {
      return dateToHumanReadableDay(day);
    },
    emitDayUpdate(event: string) {
      this.$emit("changeDate", new Date(event));
    },
    handleGenreChange(genre: genreObj) {
      if (genre.name === "All movies") {
        this.selectedGenre = "";
      } else {
        this.selectedGenre = genre.name;
      }
    },
  },
  computed: {
    genres(): genreObj[] {
      return getGenres(this.movies);
    },
    filterMovies(): movieWithScreenings[] {
      const filteredMovies = this.movies.filter(
        (item) => item.genre.name === this.selectedGenre
      );
      // making sure something is actually selected
      return this.selectedGenre == "" ? this.movies : filteredMovies;
    },
    datesForDaySwitchingButtons(): Date[] {
      const today = new Date();
      const dayIndexes = Array.from(Array(4).keys());

      return dayIndexes.map(
        (dayNumber) =>
          new Date(today.getTime() + dayNumber * ONE_DAY_IN_MILLISECONDS)
      );
    },
    currentScreeningsText(): string {
      const options = { weekday: "long" } as const;

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
    DropdownSelect,
  },
});
</script>

<template>
  <section class="screenings">
    <div class="screenings__wrapper">
      <div class="screenings__top">
        <div class="screenings__headers font--header">
          <h1>{{ $t("screenings.screenings") }}:</h1>
          <h2>
            {{ $d(new Date(selectedDay), "short") }}
          </h2>
        </div>
        <div class="screenings__filters">
          <div class="screenings__days">
            <div class="font--label">{{ $t("screenings.day") }}</div>
            <div class="screenings__button-container">
              <ui-button
                v-for="(date, index) in datesForDaySwitchingButtons"
                @click="$emit('changeDate', date)"
                :key="index"
                :transparent="
                  !(date.toDateString() === selectedDay.toDateString())
                "
                colors="primary"
                >{{ $d(new Date(date), "shortDay") }}</ui-button
              >
              <div class="screenings__calendar">
                <vc-date-picker :value="selectedDay" @input="emitDayUpdate">
                  <template v-slot="{ togglePopover }">
                    <ui-button
                      @click="togglePopover()"
                      transparent
                      colors="primary"
                    >
                      <CalendarSVG />
                    </ui-button>
                  </template>
                </vc-date-picker>
              </div>
            </div>
          </div>

          <div v-if="movies.length > 1" class="screenings__genres">
            <label for="genres" class="font--label">{{
              $t("screenings.movie")
            }}</label>
            <DropdownSelect
              :items-array="genres"
              :selected="selectedGenre"
              resetTerm="All movies"
              @select="handleGenreChange"
              class="screenings__genres--select"
            />
          </div>
        </div>
      </div>
      <div v-if="loading" class="screenings--loading"><LoadingSpinner /></div>
      <div v-else-if="error.status" class="screenings--error">
        <ErrorMessage>{{ error.message }}</ErrorMessage>
      </div>
      <template v-else-if="empty">
        <error-message>No screenings found for this day </error-message>
      </template>
      <template v-else>
        <ListOneMovie
          v-for="movie in filterMovies"
          :screenings="movie.screenings"
          :key="movie.id"
          :movie="movie"
        />
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.screenings {
  margin-top: 5.5rem;
  margin-bottom: 10rem;

  &--loading {
    text-align: center;
    margin-inline: auto;
    margin-bottom: 5rem;
  }

  &__headers {
    margin-bottom: 2rem;
    text-transform: capitalize;
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
    margin-bottom: 6.125rem;
  }

  &__filters .font--label {
    margin-bottom: 0.75rem;
  }

  &__days {
    display: flex;
    flex-direction: column;
  }

  &__button-container {
    font-size: 1rem;
    padding: 0.75rem 0;
    display: flex;
    overflow: auto;
  }

  &__button-container button {
    font-size: 0.875rem;
    padding: 19px 40px;
    text-transform: capitalize;
  }

  &__button-container .button + .button {
    margin-left: 0.625rem;
  }

  &__days &__button-container {
    font-size: 1rem;
    padding: 0.75rem 0;
    display: flex;
    overflow: auto;
  }

  &__button-container .button + .button {
    margin-left: 0.625rem;
  }

  &__calendar {
    display: inline-block;
    margin: auto 10px;
  }

  &__calendar button {
    padding: 12px 16px;
  }

  &__days .screenings__button-container:last-child {
    padding-right: 0.625rem;
  }

  &__genres {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__genres--select {
    width: min(calc(100% - 1.5rem), 29.25rem);
    margin-right: 1.5rem;

    border: 0;
    background-color: #f7f7f7;
  }

  @include media-sm {
    &__headers {
      margin-inline: 1.5rem;
      margin-bottom: 2rem;
    }

    &__filters {
      margin-left: 1.5rem;
    }

    &__calendar button {
      font-size: 14px;
      padding: 2px 4px;
    }

    &__button-container button {
      font-size: 14px;
      padding: 9px 24px;
    }
  }

  @include media-md {
    &__headers h1 {
      font-size: 64px;
    }

    &__headers h2 {
      font-size: 64px;
    }

    &__filters {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__button-container button {
      font-size: 18px;
    }

    &__genres {
      justify-content: space-around;
    }

    &__genres--select {
      margin: 0;
      width: 100%;
      margin: 12px 0;
    }

    &__genres .font--label {
      font-size: 14px;
      justify-self: flex-start;
    }
  }
}
</style>

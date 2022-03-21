<script>
import MainHeader from "@/components/MainHeader.vue";
import { showSeances, getHall, getOneMovie } from "@/helpers/api/movies";
import ListOneMovie from "../components/chunks/ListOneMovie.vue";
import Tags from "../components/UI/Tags.vue";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateArray(length, taken_seats) {
  const metaArr = Array.from(Array(length).keys());
  return metaArr.map((item, index) => {
    const seatsObj = {
      row: alphabet[index],
      array: arrayWithLetter(alphabet[index], 10, taken_seats),
    };
    return seatsObj;
  });
}

function arrayWithLetter(letter, length = 10, taken_seats = []) {
  const arr = Array.from(Array(length));
  return arr.map((item, index) => {
    const value = letter + (index + 1);
    const isTaken = taken_seats.indexOf(value) === -1 ? false : true;

    const arrObj = {
      taken: false,
      reserved: isTaken,
      value,
    };
    return arrObj;
  });
}

export default {
  data() {
    return {
      seance: null,
      hall: null,
      movie: null,
      array: Array.from(Array(10).keys()),
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  watch: {
    seance(newSeances) {
      this.fetchHall(newSeances.hall);
      this.fetchMovie(newSeances.movie);
    },
  },
  mounted() {
    this.fetchShowSeances();
  },
  methods: {
    async fetchShowSeances() {
      const response = await showSeances(this.id);
      this.seance = response.data;
    },
    async fetchHall(id) {
      const response = await getHall(id);
      this.hall = response.data;
      const seatLength = response.data.seats / 10;
      this.array = generateArray(seatLength, this.seance.taken_seats);
    },
    async fetchMovie(movieId) {
      const response = await getOneMovie(movieId);
      this.movie = response.data;
    },
    toggleTakeSeat(item) {
      const letter = item.value[0];
      const indexMainArr = this.array.findIndex((arr) => arr.row === letter);
      const indexNestArr = this.array[indexMainArr].array.findIndex((arr) => {
        return arr.value === item.value;
      });
      if (!this.array[indexMainArr].array[indexNestArr].reserved) {
        this.array[indexMainArr].array[indexNestArr].taken =
          !this.array[indexMainArr].array[indexNestArr].taken;
      }
    },
  },
  computed: {
    loadingFinished() {
      return !!(this.hall && this.seance && this.movie);
    },
  },
  components: { MainHeader, ListOneMovie, Tags },
};
</script>

<template>
  <div>
    <MainHeader />
    <div>Breadcrubs</div>
    <div v-if="loadingFinished">
      <ListOneMovie show :movie="movie">
        <Tags class="tag">{{ new Date().toUTCString() }}</Tags>
      </ListOneMovie>
      <main>
        <div
          v-for="(item, index) in array"
          class="booking__container"
          :key="index"
        >
          <div>{{ item.row }}</div>
          <div
            @click="toggleTakeSeat(i)"
            v-for="(i, arrIndex) in item.array"
            :key="i.value"
            class="square"
            :class="{
              'square--user-checked': i.taken,
              'square--reserved': i.reserved,
            }"
          >
            <div>{{ arrIndex + 1 }}</div>
          </div>
          <div>{{ item.row }}</div>
        </div>
        <h1>Choose your seats</h1>
        <div>Card</div>
        <div>Choose seats menu</div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag {
  font-size: 16px;
  color: var(--color-brand);
  font-family: "Roboto Mono";
  font-weight: 500;
  line-height: 100%;
  margin-top: auto;
}
.booking__container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
}
.square {
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbcfd0;
}

.square--reserved {
  background: #ccc;
}

.square--user-checked {
  background: red;
}
p {
  margin: 0;
  padding: 0;
}
</style>

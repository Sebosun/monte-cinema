import { getOneSeance, getHall, getOneMovie } from "@/helpers/api/movies";
import genSeatsTable from "@/helpers/genSeatsTable";

const tickets = {
  namespaced: true,
  state: {
    seance: null,
    movie: null,
    hall: null,
    chosenSeats: [],
    seatsArray: [],
    ticketTypes: [
      { id: 1, name: "Adult", price: 20.0 },
      { id: 2, name: "Child", price: 10.0 },
      { id: 3, name: "Senior", price: 15.0 },
      { id: 4, name: "Student", price: 12.0 },
    ],
  },
  getters: {
    getMovie: (state) => state.movie,
    getSeance: (state) => state.seance,
    getHall: (state) => state.hall,
    getIsLoading: (state) => state.loading,
    getChosenSeats: (state) => state.chosenSeats,
    getSeatsArray: (state) => state.seatsArray,
    getTotalPrice: (state) =>
      state.chosenSeats.reduce((acc, cur) => acc + cur.ticket.price, 0),
  },
  mutations: {
    setSeance(state, payload) {
      state.seance = payload;
    },
    setMovie(state, payload) {
      state.movie = payload;
    },
    setHall(state, payload) {
      state.hall = payload;
    },
    clearData(state) {
      state.seance = null;
      state.movie = null;
      state.hall = null;
      state.chosenSeats = [];
      state.stateArray = [];
    },
    addChosenSeat(state, seat) {
      state.chosenSeats.push({ seat, ticket: state.ticketTypes[0] });
    },
    deleteChosenSeatsValue(state, seat) {
      const arraySeats = state.chosenSeats.map((item) => item.seat);
      const indexOfSeat = arraySeats.indexOf(seat);

      state.chosenSeats.splice(indexOfSeat, 1);
    },
    setSeatsArray(state, seatsArray) {
      state.seatsArray = seatsArray;
    },
    changeSeatStatus(state, indexes) {
      const { indexTopArray, indexNestedArray } = indexes;
      const nestedSelectedArr =
        state.seatsArray[indexTopArray].array[indexNestedArray];
      //so that we cannot book something already reserved on backend
      if (!nestedSelectedArr.reserved) {
        nestedSelectedArr.taken = !nestedSelectedArr.taken;
      }
    },
    updateTicketType(state, payload) {
      const ticket = state.ticketTypes.find((item) => {
        return item.id == payload.ticketId;
      });

      const newArr = [...state.chosenSeats];
      newArr[payload.index].ticket = ticket;
      state.chosenSeats = newArr;
    },
  },
  actions: {
    clearData({ commit }) {
      commit("clearData");
    },
    async fetchSeance({ commit }, id) {
      const response = await getOneSeance(id);
      commit("setSeance", response.data);
    },
    async fetchMovie({ commit }, id) {
      const response = await getOneMovie(id);
      commit("setMovie", response.data);
    },
    async fetchHall({ commit }, id) {
      const response = await getHall(id);
      commit("setHall", response.data);
    },
    flipChosenSeat({ commit, state }, seat) {
      const arraySeats = state.chosenSeats.map((item) => item.seat);
      const indexOfSeat = arraySeats.indexOf(seat);

      if (indexOfSeat != -1) {
        commit("deleteChosenSeatsValue", seat);
      } else {
        commit("addChosenSeat", seat);
      }
    },

    generateSeatsArray({ commit, state }) {
      const seatLength = state.hall.seats / 10;
      const taken_seats = state.seance.taken_seats;
      commit("setSeatsArray", genSeatsTable(seatLength, taken_seats));
    },
    toggleTakeSeat({ dispatch, commit, state }, seat) {
      const letter = seat.value[0];
      const indexTopArray = state.seatsArray.findIndex(
        (arr) => arr.row === letter
      );
      const indexNestedArray = state.seatsArray[indexTopArray].array.findIndex(
        (arr) => {
          return arr.value === seat.value;
        }
      );

      dispatch("flipChosenSeat", seat.value);
      commit("changeSeatStatus", { indexTopArray, indexNestedArray });
    },
    updateTicketType({ commit }, values) {
      debugger;
      commit("updateTicketType", values);
    },
  },
};

export default tickets;

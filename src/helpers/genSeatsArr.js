const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function generateArray(length, taken_seats) {
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

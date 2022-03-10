export default function movieLength(length) {
  const hours = Math.floor(length / 60);
  const minutes = `0${length % 60}`.slice(-2);
  return `${hours}h ${minutes} min`;
}

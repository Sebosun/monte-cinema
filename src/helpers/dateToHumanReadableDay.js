export default function dateToHumanReadableDay(date) {
  var options = { weekday: "short" };
  const today = new Date().toDateString();
  const dayString = new Intl.DateTimeFormat("en-US", options).format(date);
  return date.toDateString() === today ? "Today" : dayString;
}

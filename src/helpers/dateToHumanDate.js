export default function dayToHumanDate(date) {
  var options = { weekday: "long" };
  const today = new Date().toDateString();
  return date.toDateString() === today
    ? "Today"
    : new Intl.DateTimeFormat("en-US", options).format(date);
}

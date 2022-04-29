export const ONE_DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

export function dateToHumanReadableDay(date: Date) {
  const options = { weekday: "short" };
  const today = new Date().toDateString();
  const dayString = new Intl.DateTimeFormat("en-US", options).format(date);
  return date.toDateString() === today ? "Today" : dayString;
}

export function dateToBookingHour(date: string) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const constructedDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", options).format(constructedDate);
}

export function minutesToHoursAndRemainder(length: number) {
  const hours = Math.floor(length / 60);
  const minutes = `0${length % 60}`.slice(-2);
  return `${hours}h ${minutes} min`;
}

export function dateToHoursMinutes(date: Date, timezone = "pl-PL") {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat(timezone, options).format(date);
}

import { getDay, isToday, parse } from "date-fns";

/**
 * Maps day indices returned by Date Fns' getDay to corresponding day names.
 * @type {Object.<number, string>} dayIndexMap - An object mapping day indices to their respective day names.
 */
const dayIndexMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

/**
 * Retrieves the day of the week for a given date string.
 * If the date is today, returns "Today"; otherwise, returns the corresponding day name.
 * @param {string} dateString - A string representing the date in the "yyyy-MM-dd" format.
 * @returns {string} The day of the week or "Today" based on the provided date string.
 */
export default function getDayOfWeek(dateString) {
  const dateObj = parse(dateString, "yyyy-MM-dd", new Date());
  if (isToday(dateObj)) {
    return "Today";
  }

  //  Get date index and map to corresponding day name
  const dayIndex = getDay(dateObj);
  return dayIndexMap[dayIndex];
}

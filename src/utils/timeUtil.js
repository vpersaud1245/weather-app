/**
 * Gets the hour from the local time.
 * @param {String} localTime - The local time returned from the API in the format "YYYY-MM-dd HH:mm".
 * @returns {Number} The hour extracted from the local time.
 */
function getHourFromLocalTime(localTime) {
  return Number(localTime.slice(-5, -3));
}

/**
 * Determines the time of day based on the provided localTime.
 * @param {Number} localTime - The local time in the format "HH:mm".
 * @returns {String} - Either "Day" or "Night" based on the local time.
 */
export default function getTimeOfDay(localTime) {
  const hourOfDay = getHourFromLocalTime(localTime);
  const NIGHTSTART = 20;
  const NIGHTEND = 6;
  // If time is between 8PM and 6AM return night
  if (hourOfDay >= NIGHTSTART || hourOfDay <= NIGHTEND) {
    return "Night";
  }
  return "Day";
}

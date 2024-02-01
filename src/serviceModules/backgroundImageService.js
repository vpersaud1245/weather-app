import backgroundImages from "../backgroundImages";

/**
 * Gets the hour from the local time.
 * @param {String} localTime - The local time in the format "HH:mm".
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
function getTimeOfDay(localTime) {
  const hourOfDay = getHourFromLocalTime(localTime);
  const NIGHTSTART = 20;
  const NIGHTEND = 6;
  if (hourOfDay >= NIGHTSTART || hourOfDay <= NIGHTEND) {
    return "Night";
  }
  return "Day";
}

/**
 * Mapping of weather condition codes returned by the API to conditions used for displaying backgrounds.
 * @type {Object}
 */
const conditionCodeBackgroundMap = {
  clear: [1000],
  "party cloudy": [1003],
  cloudy: [1006, 1009, 1030, 1135, 1147],
  rain: [
    1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240,
    1243,
  ],
  snow: [
    1066, 1069, 1072, 1114, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219,
    1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
  ],
  storm: [1273, 1276, 1279, 1282, 1087, 1117, 1246, 1246, 1087, 1117],
};

/**
 * Returns a weather condition to be used in setting the current weather background.
 * @param {String} weatherConditionCode - The code representing a specific weather condition.
 * @returns {String} The corresponding weather condition for background display.
 */
function getWeatherConditionFromCode(weatherConditionCode) {
  if (conditionCodeBackgroundMap.clear.includes(weatherConditionCode))
    return "clear";
  if (conditionCodeBackgroundMap["party cloudy"].includes(weatherConditionCode))
    return "partlyCloudy";
  if (conditionCodeBackgroundMap.cloudy.includes(weatherConditionCode))
    return "cloudy";
  if (conditionCodeBackgroundMap.rain.includes(weatherConditionCode))
    return "rain";
  if (conditionCodeBackgroundMap.snow.includes(weatherConditionCode))
    return "snow";
  if (conditionCodeBackgroundMap.storm.includes(weatherConditionCode))
    return "storm";
  return "Weather condition code not found in function getWeatherConditionCode";
}

/**
 * Generates the URL for a background image based on local time and weather condition code.
 * @param {String} localTime - The local time in the format "HH:mm".
 * @param {String} weatherConditionCode - The code representing a specific weather condition.
 * @returns {String} - The URL for the corresponding background image.
 * @throws {Error} - If the weather condition code is not found in the mapping.
 */
export default function getBackgroundImgUrl(localTime, weatherConditionCode) {
  // Get time and weather condition
  const timeOfDay = getTimeOfDay(localTime);
  const condition = getWeatherConditionFromCode(weatherConditionCode);

  // Dynamically access the variable based on timeOfDay and weather condition
  return backgroundImages[`${condition}${timeOfDay}`];
}

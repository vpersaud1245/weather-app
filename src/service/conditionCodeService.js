/**
 * Mapping of weather condition codes returned by the API to conditions used for display.
 * @type {Object}
 */
const conditionCodeMap = {
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
 * Retrieves the general weather condition for background and icon display based on the provided weather condition code.
 * @param {string} weatherConditionCode - The code representing a specific weather condition.
 * @returns {string} The corresponding weather condition (Clear, Partly Cloudy, Cloudy, Rain, Snow, Storm) for display purposes.
 */
export default function getWeatherConditionFromCode(weatherConditionCode) {
  if (conditionCodeMap.clear.includes(weatherConditionCode)) return "clear";

  if (conditionCodeMap["party cloudy"].includes(weatherConditionCode))
    return "partlyCloudy";

  if (conditionCodeMap.cloudy.includes(weatherConditionCode)) return "cloudy";

  if (conditionCodeMap.rain.includes(weatherConditionCode)) return "rain";

  if (conditionCodeMap.snow.includes(weatherConditionCode)) return "snow";

  if (conditionCodeMap.storm.includes(weatherConditionCode)) return "storm";

  return "Weather condition code not found in function getWeatherConditionCode";
}

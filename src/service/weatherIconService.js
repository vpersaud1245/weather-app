import getWeatherConditionFromCode from "./conditionCodeService";
import weatherConditionIcons from "../resources/weatherIcons";

/**
 * Returns the URL of the weather icon image corresponding to the provided weather condition code.
 * @param {string} weatherConditionCode - The code representing the specific weather condition returned from the API.
 * @returns {string} The URL of the weather icon image.
 */
export default function getWeatherIcon(weatherConditionCode) {
  const weatherCondition = getWeatherConditionFromCode(weatherConditionCode);
  return weatherConditionIcons[weatherCondition];
}

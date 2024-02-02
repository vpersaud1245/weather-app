import backgroundImages from "../resources/backgroundImages";
import getTimeOfDay from "../utils/timeUtil";
import getWeatherConditionFromCode from "./conditionCodeService";

/**
 * Generates the URL for a background image based on local time and weather condition code.
 * @param {String} localTime - The local time in the format "HH:mm".
 * @param {String} weatherConditionCode - The code representing a specific weather condition.
 * @returns {String} - The URL for the corresponding background image.
 * @throws {Error} - If the weather condition code is not found in the mapping.
 */
export default function getBackgroundImg(weatherConditionCode, localTime) {
  // Get time and weather condition
  const timeOfDay = getTimeOfDay(localTime);
  const condition = getWeatherConditionFromCode(weatherConditionCode);

  // Dynamically access the variable based on timeOfDay and weather condition
  return backgroundImages[`${condition}${timeOfDay}`];
}

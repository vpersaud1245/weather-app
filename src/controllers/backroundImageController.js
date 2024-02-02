import backgroundImages from "../resources/backgroundImages";
import getTimeOfDay from "../utils/timeUtil";
import getWeatherConditionFromCode from "../service/conditionCodeService";

/**
 * Generates the URL for a background image based on local time and weather condition code.
 * @param {String} localTime - The local time in the format "HH:mm".
 * @param {String} weatherConditionCode - The code representing a specific weather condition.
 * @returns {String} - The URL for the corresponding background image.
 * @throws {Error} - If the weather condition code is not found in the mapping.
 */
function getBackgroundImgUrl(weatherConditionCode, localTime) {
  // Get time and weather condition
  const timeOfDay = getTimeOfDay(localTime);
  const condition = getWeatherConditionFromCode(weatherConditionCode);

  // Dynamically access the variable based on timeOfDay and weather condition
  return backgroundImages[`${condition}${timeOfDay}`];
}

/**
 * Sets the background image of the current weather element based on the weather condition code and local time.
 * @param {string} weatherConditonCode - The weather condition code used to determine the background image.
 * @param {string} localTime - The local time used to determine the appropriate background image for the time of day.
 */
export default function setBackgroundImg(weatherConditonCode, localTime) {
  const backgroundUrl = getBackgroundImgUrl(weatherConditonCode, localTime);
  const currentWeatherElement = document.querySelector(".weather-dashboard");
  currentWeatherElement.style.backgroundImage = `url(${backgroundUrl})`;
}

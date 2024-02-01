import getBackgroundImgUrl from "../serviceModules/backgroundImageService";

/**
 * Sets the background image of the current weather element based on the weather condition code and local time.
 * @param {string} weatherConditonCode - The weather condition code used to determine the background image.
 * @param {string} localTime - The local time used to determine the appropriate background image for the time of day.
 */
export default function setBackgroundImg(weatherConditonCode, localTime) {
  const backgroundUrl = getBackgroundImgUrl(weatherConditonCode, localTime);
  const currentWeatherElement = document.querySelector(".current-weather");
  currentWeatherElement.style.backgroundImage = `url(${backgroundUrl})`;
}

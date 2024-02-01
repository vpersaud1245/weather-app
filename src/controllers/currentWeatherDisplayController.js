import setBackgroundImg from "./backroundImageController";

/**
 * Returns An object containing all of the current weather DOM elements
 */
function getCurrentWeatherDomELements() {
  const cityName = document.querySelector(".current-weather__city");
  const currentTemp = document.querySelector(".current-weather__temperature");
  const currentCondition = document.querySelector(
    ".current-weather__condition",
  );
  const highTemp = document.querySelector(".current-weather__high-low--high");
  const highLowDividerSlash = document.querySelector(".high-low-temp__divider");
  const lowTemp = document.querySelector(".current-weather__high-low--low");
  return {
    cityName,
    currentTemp,
    currentCondition,
    highTemp,
    highLowDividerSlash,
    lowTemp,
  };
}

/**
 * Populates the current weather display on the UI with information from the provided weather data array.
 * @param {string} cityName - The name of the city for which the weather is displayed.
 * @param {Promise<Array>} weatherDataArray - A promise resolving to an array of weather data.
 */
export default function populateCurrentWeatherDisplay(
  cityName,
  weatherDataArray,
) {
  // Cache DOM Elements
  const currentWeatherDomElements = getCurrentWeatherDomELements();

  weatherDataArray.then((array) => {
    // Get current weather condition and local time from weatherData
    const currentWeatherData = array[0];
    const conditionCode = currentWeatherData.condition.code;
    const { localTime } = currentWeatherData;

    const DEGREE_SYMBOL = "&deg;";

    // Populate DOM Elements with current weather Data
    setBackgroundImg(conditionCode, localTime);
    currentWeatherDomElements.cityName.textContent = cityName;
    currentWeatherDomElements.currentTemp.innerHTML = `${currentWeatherData.temp}${DEGREE_SYMBOL}`;
    currentWeatherDomElements.currentCondition.textContent =
      currentWeatherData.condition.text;
    currentWeatherDomElements.highTemp.innerHTML = `H:${currentWeatherData.maxTemp}${DEGREE_SYMBOL}`;
    currentWeatherDomElements.highLowDividerSlash.textContent = "/";
    currentWeatherDomElements.lowTemp.innerHTML = `L:${currentWeatherData.minTemp}${DEGREE_SYMBOL}`;
  });
}

import setBackgroundImg from "./backroundImageController";

/**
 * Populates the current weather display on the UI with information from the provided weather data array.
 * @param {string} cityName - The name of the city for which the weather is displayed.
 * @param {Promise<Array>} weatherDataArray - A promise resolving to an array of weather data.
 */
export default function populateCurrentWeatherDisplay(
  cityName,
  weatherDataArray,
) {
  const cityNameElement = document.querySelector(".current-weather__city");
  const currentTempElement = document.querySelector(
    ".current-weather__temperature",
  );
  const currentConditionElement = document.querySelector(
    ".current-weather__condition",
  );
  const highTempElement = document.querySelector(
    ".current-weather__high-low--high",
  );
  const highLowDividerSlash = document.querySelector(".high-low-temp__divider");
  const lowTempElement = document.querySelector(
    ".current-weather__high-low--low",
  );

  weatherDataArray.then((array) => {
    const degreeSymbol = "&deg;";
    const currentWeatherData = array[0];
    const conditionCode = currentWeatherData.condition.code;
    const { localTime } = currentWeatherData;
    setBackgroundImg(conditionCode, localTime);
    cityNameElement.textContent = cityName;
    currentTempElement.innerHTML = `${currentWeatherData.temp}${degreeSymbol}`;
    currentConditionElement.textContent = currentWeatherData.condition.text;
    highTempElement.innerHTML = `H:${currentWeatherData.maxTemp}${degreeSymbol}`;
    highLowDividerSlash.textContent = "/";
    lowTempElement.innerHTML = `L:${currentWeatherData.minTemp}${degreeSymbol}`;
  });
}

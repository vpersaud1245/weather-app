/**
 * Retrieves DOM elements for weather details.
 * @function
 * @returns {Object} - Object containing weather detail DOM elements.
 */
function getWeatherDetailDomElements() {
  const precipitation = document.querySelector(
    ".weather-details__data--precipitation",
  );
  const feelsLike = document.querySelector(
    ".weather-details__data--feels-like",
  );
  const humidity = document.querySelector(".weather-details__data--humidity");
  const windSpeed = document.querySelector(
    ".weather-details__data--wind-speed",
  );
  const precipitationTitle = document.querySelector(
    ".weather-details__title--precipitation",
  );
  const feelsLikeTitle = document.querySelector(
    ".weather-details__title--feels-like",
  );
  const windSpeedTitle = document.querySelector(
    ".weather-details__title--wind-speed",
  );
  const humidityTitle = document.querySelector(
    ".weather-details__title--humidity",
  );
  const uvIndexTitle = document.querySelector(
    ".weather-details__title--uv-index",
  );
  const uvIndex = document.querySelector(".weather-details__data--uv-index");
  return {
    precipitation,
    feelsLike,
    humidity,
    windSpeed,
    uvIndex,
    precipitationTitle,
    feelsLikeTitle,
    windSpeedTitle,
    humidityTitle,
    uvIndexTitle,
  };
}

/**
 * Sets titles for weather detail elements.
 * @function
 * @returns {void}
 */
function setWeatherDetailTitles() {
  const weatherDetailDomElements = getWeatherDetailDomElements();
  const { precipitationTitle } = weatherDetailDomElements;
  precipitationTitle.textContent = "PRECIPITATION";
  const { feelsLikeTitle } = weatherDetailDomElements;
  feelsLikeTitle.textContent = "FEELS LIKE";
  const { windSpeedTitle } = weatherDetailDomElements;
  windSpeedTitle.textContent = "WIND SPEED";
  const { humidityTitle } = weatherDetailDomElements;
  humidityTitle.textContent = "HUMIDITY";
  const { uvIndexTitle } = weatherDetailDomElements;
  uvIndexTitle.textContent = "UV INDEX";
}

/**
 * Retrieves weather detail values from the provided weather data.
 * @function
 * @param {Promise<Array>} weatherData - A promise resolving to an array of weather data.
 * @returns {Promise<Object>} - Promise resolving to an object with weather detail values.
 */
function getWeatherDetailValues(weatherData) {
  return weatherData.then((weatherDataArray) => {
    const currentWeather = weatherDataArray[0];
    const precipitation = currentWeather.chanceOfRain;
    const { feelsLike } = currentWeather;
    const { humidity } = currentWeather;
    const windSpeed = currentWeather.windMph;
    const uvIndex = currentWeather.uv;

    return { precipitation, feelsLike, humidity, windSpeed, uvIndex };
  });
}

/**
 * Populates the weather detail display on the UI with information from the provided weather data.
 * @async
 * @function
 * @param {Promise<Array>} weatherData - A promise resolving to an array of weather data.
 * @returns {void}
 */
export default async function populateWeatherDetailDisplay(weatherData) {
  // Get weather details
  const weatherDetails = await getWeatherDetailValues(weatherData);
  // Get Dom Elements
  const weatherDetailDomElements = getWeatherDetailDomElements();

  // Populate UI
  setWeatherDetailTitles();
  const DEGREE_SYMBOL = "&deg;";
  weatherDetailDomElements.precipitation.textContent = `${weatherDetails.precipitation}%`;
  weatherDetailDomElements.feelsLike.innerHTML =
    weatherDetails.feelsLike + DEGREE_SYMBOL;
  weatherDetailDomElements.humidity.textContent = `${weatherDetails.humidity}%`;
  weatherDetailDomElements.windSpeed.textContent = `${weatherDetails.windSpeed} mph`;
  weatherDetailDomElements.uvIndex.textContent = weatherDetails.uvIndex;
  const weatherDetailElement = document.querySelector(".weather-details");
  weatherDetailElement.style.display = "grid";
}

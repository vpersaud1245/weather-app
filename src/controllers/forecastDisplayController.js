import getDayOfWeek from "../utils/dateUtil";
import getWeatherIcon from "../service/weatherIconService";

/**
 * Retrieves DOM elements representing the weather forecast for multiple days.
 * @function
 * @returns {Object} An object containing references to DOM elements for each day's forecast.
 * @property {HTMLElement} day1Forecast - DOM element representing the forecast for day 1.
 * @property {HTMLElement} day2Forecast - DOM element representing the forecast for day 2.
 * @property {HTMLElement} day3Forecast - DOM element representing the forecast for day 3.
 */
function getForecastDomElements() {
  const day1Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--today",
  );
  const day2Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--day-2",
  );
  const day3Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--day-3",
  );

  return {
    day1Forecast,
    day2Forecast,
    day3Forecast,
  };
}

/**
 * Clears the weather forecast display by hiding the container and removing content from individual forecast elements.
 */
function clearForecastDisplay() {
  const weatherForecast = document.querySelector(".weather-forecast");
  weatherForecast.style.display = "none";
  const forecastItemElements = getForecastDomElements();
  forecastItemElements.day1Forecast.innerHTML = "";
  forecastItemElements.day2Forecast.innerHTML = "";
  forecastItemElements.day3Forecast.innerHTML = "";
}

/**
 * Displays the weather forecast by setting the display property of the forecast container to "block".
 */
function displayWeatherForecast() {
  const weatherForecast = document.querySelector(".weather-forecast");
  const weatherForecastTitle = document.querySelector(
    ".weather-forecast__title",
  );
  weatherForecastTitle.textContent = "3-DAY FORECAST";
  weatherForecast.style.display = "block";
}

/**
 * Appends forecast data elements to a given forecast item, including day label, condition icon, and high/low temperatures.
 * @function
 * @param {string} forecastedDay - The day label for the forecast.
 * @param {string} forecastedConditionCode - The code returened by the API representing the forecasted weather condition.
 * @param {string} forecastedHighTemp - The forecasted high temperature.
 * @param {string} forecastLowTemp - The forecasted low temperature.
 * @param {HTMLElement} forecastItem - The DOM element representing the forecast item.
 */
function appendForecastDataElement(
  forecastedDay,
  forecastedConditionCode,
  forecastedHighTemp,
  forecastLowTemp,
  forecastItem,
) {
  const DEGREE_SYMBOL = "&deg;";

  // Create forecast day label
  const day = document.createElement("div");
  day.classList.add("forecast-item__day");
  day.textContent = forecastedDay;

  // Create and set conditon icon image
  const conditionIcon = document.createElement("img");
  conditionIcon.classList.add("forecast-item__condition-icon");
  conditionIcon.alt = "condition-icon";
  conditionIcon.src = getWeatherIcon(forecastedConditionCode);

  // Create High and Low temp wrapper
  const highLowWrapper = document.createElement("div");
  highLowWrapper.classList.add("forecast-item__high-low");

  // Create and set High Temp element
  const highTemp = document.createElement("div");
  highTemp.classList.add("forecast-item__high-low--high");
  highTemp.innerHTML = `${forecastedHighTemp}${DEGREE_SYMBOL}`;

  // Create and set Low Temp element
  const lowTemp = document.createElement("div");
  lowTemp.classList.add("forecast-item__high-low--low");
  lowTemp.innerHTML = `${forecastLowTemp}${DEGREE_SYMBOL}`;

  // Append elements to wrapper and then to appropriate forecast item
  highLowWrapper.append(highTemp, lowTemp);
  forecastItem.append(day, conditionIcon, highLowWrapper);
}

/**
 * Populates the forecast display with weather data.
 * @param {Promise} weatherData - A Promise resolving to an array of weather data for multiple days.
 */
export default function populateForecastDisplay(weatherData) {
  weatherData.then((weatherDataArray) => {
    // Get DOM Elements
    const forecastDomElements = getForecastDomElements();

    // Reset the forecast display
    clearForecastDisplay();

    // Populate forecast diaplay with data and append to appropriate forecast elements
    for (let i = 0; i < weatherDataArray.length; i += 1) {
      const forecastData = weatherDataArray[i];
      const dayNumber = i + 1;
      const forecastedDay = getDayOfWeek(forecastData.date);
      const forecastedConditionCode = forecastData.condition.code;
      const forecastedHighTemp = forecastData.maxTemp;
      const forecastLowTemp = forecastData.minTemp;
      appendForecastDataElement(
        forecastedDay,
        forecastedConditionCode,
        forecastedHighTemp,
        forecastLowTemp,
        forecastDomElements[`day${dayNumber}Forecast`],
      );
    }

    // Display the forecast
    displayWeatherForecast();
  });
}

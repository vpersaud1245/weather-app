import WeatherData from "./weatherData";

const KEY = "8a48ddac42884c79bcc05824242401";

/* ----- HELPER FUNCTIONS ----- */
/**
 * Creates the API call URL for the given request and city.
 *
 * @param {string} requestType - Type of API request ("forecast" or "search").
 * @param {string} city - The city for which the weather data is collected.
 * @param {number} [forecastedDays] - Number of days for the forecast (only applicable for "forecast" requests).
 * @returns {string} The formatted API call URL.
 */
function createApiUrl(requestType, location, forecastedDays) {
  if (requestType === "search") {
    return `http://api.weatherapi.com/v1/${requestType}.json?key=${KEY}&q=${location}&aqi=no`;
  }
  if (requestType === "forecast") {
    return `http://api.weatherapi.com/v1/${requestType}.json?key=${KEY}&q=${location}&days=${forecastedDays}&aqi=no`;
  }
  return "Request type not accepted";
}

/**
 * Combines and formats the current and forecasted weather data for the current day
 * to create a new object with key data points.
 *
 * @param {string} location - The location for which the weather data is collected.
 * @param {object} forecastedWeatherData - Forecasted weather object for the day returned by the API.
 * @param {string} date - The date for which the weather data is being collected.
 * @param {object} currentWeatherData - Current weather object returned by the API.
 * @returns {WeatherData} A new WeatherData object containing formatted weather information.
 */
function createWeatherDataObject(
  location,
  date,
  localTime,
  forecastedWeatherData,
  currentWeatherData,
) {
  // Add forecasted days data points
  const { condition } = forecastedWeatherData;
  const maxTemp = Math.round(forecastedWeatherData.maxtemp_f);
  const minTemp = Math.round(forecastedWeatherData.mintemp_f);
  // Add current day data points
  if (currentWeatherData !== undefined) {
    const temp = Math.round(currentWeatherData.temp_f);
    const feelsLike = Math.round(currentWeatherData.feelslike_f);
    const chanceOfRain = forecastedWeatherData.daily_chance_of_rain;
    const windMph = Math.round(currentWeatherData.wind_mph);
    const { humidity } = currentWeatherData;
    const { uv } = currentWeatherData;
    return new WeatherData(
      location,
      condition,
      maxTemp,
      minTemp,
      date,
      temp,
      localTime,
      feelsLike,
      chanceOfRain,
      windMph,
      humidity,
      uv,
    );
  }

  return new WeatherData(location, condition, maxTemp, minTemp, date);
}

/**
 * Converts an array of forecasted data into an array of formatted weather data objects.
 *
 * @param {string} location - The location for which the weather data is collected.
 * @param {string} localTime - The local time for the entire forecast (only needed for the current day).
 * @param {Array} forecastDataArray - An array containing forecasted weather data for multiple days.
 * @param {object} currentWeatherData - Current weather data for the specified location.
 * @returns {Array<WeatherData>} An array of WeatherData objects containing formatted weather information for each forecasted day.
 */
function createForecastObjectArray(
  location,
  localTime,
  forecastDataArray,
  currentWeatherData,
) {
  const forecastObjectArray = [];
  if (forecastDataArray.length > 0) {
    for (let i = 0; i < forecastDataArray.length; i += 1) {
      const forecast = forecastDataArray[i];
      const { date } = forecast;

      // If day is current day supply current weather data to retieve all of the data points
      if (i === 0) {
        forecastObjectArray.push(
          createWeatherDataObject(
            location,
            date,
            localTime,
            forecast.day,
            currentWeatherData,
          ),
        );
      } else {
        forecastObjectArray.push(
          createWeatherDataObject(location, date, localTime, forecast.day),
        );
      }
    }
  }
  return forecastObjectArray;
}
/* ----------------------------- */

/* ----- API CALLS ----- */

/**
 * Retrieves and returns an array of weatherData objects for the specified location, including the current day.
 *
 * @param {string} location - The location for which to retrieve weather data (city name or location ID returned by the search API).
 * @param {number} numOfDays - The number of days to retrieve weather forecast data (maximum 3).
 * @returns {Array<WeatherData>} An array of WeatherData objects containing formatted weather information for each forecasted day.
 */
export default async function getWeatherForecast(location, numOfDays) {
  try {
    const url = createApiUrl("forecast", location, numOfDays);
    const response = await fetch(url, { mode: "cors" });
    const jsonData = await response.json();
    const currentWeatherData = jsonData.current;
    const forecastDaysArray = jsonData.forecast.forecastday;
    const localTime = jsonData.location.localtime;
    return createForecastObjectArray(
      location,
      localTime,
      forecastDaysArray,
      currentWeatherData,
    );
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}

export { getWeatherForecast };

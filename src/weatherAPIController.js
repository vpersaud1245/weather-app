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
  forecastedWeatherData,
  currentWeatherData,
) {
  const { condition } = forecastedWeatherData;
  const maxTemp = Math.round(forecastedWeatherData.maxtemp_f);
  const minTemp = Math.round(forecastedWeatherData.mintemp_f);
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
 * @param {Array} forecastDataArray - An array containing forecasted weather data for multiple days.
 * @returns {Array<WeatherData>} An array of WeatherData objects containing formatted weather information for each forecasted day.
 */
function createForecastObjectArray(location, forecastDataArray) {
  const forecastObjectArray = [];
  if (forecastDataArray.length > 0) {
    forecastDataArray.forEach((forecast) => {
      const { date } = forecast;
      forecastObjectArray.push(
        createWeatherDataObject(location, date, forecast.day),
      );
    });
  }
  return forecastObjectArray;
}
/* ----------------------------- */

/* ----- API CALLS ----- */
/**
 * Returns an object containing the current weather information for
 * the given location.
 * @param {String} location - The location to retrieve weather data for (city name or location id returned by search api)
 */
async function getCurrentWeather(location) {
  try {
    const url = createApiUrl("forecast", location, "1");
    const response = await fetch(url, { mode: "cors" });
    console.log(`Response Status: ${response.status}`);
    const jsonData = await response.json();
    const currentWeatherData = jsonData.current;
    const forecastedWeatherData = jsonData.forecast.forecastday[0].day;
    const currentDate = jsonData.forecast.forecastday[0].date;
    const weatherData = createWeatherDataObject(
      location,
      currentDate,
      forecastedWeatherData,
      currentWeatherData,
    );
    return weatherData;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}

/**
 * Retrieves and returns the weather data for the next 3 days, including the current day, for the specified location.
 * @param {string} location - The location to retrieve weather data for (city name or location ID returned by the search API).
 */
async function get3DayForecast(location) {
  try {
    const url = createApiUrl("forecast", location, 3);
    const response = await fetch(url, { mode: "cors" });
    const jsonData = await response.json();
    const forecastDaysArray = jsonData.forecast.forecastday;
    return createForecastObjectArray(location, forecastDaysArray);
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}

export { get3DayForecast, getCurrentWeather };

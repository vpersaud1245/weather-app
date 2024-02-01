import {
  createApiUrl,
  createForecastObjectArray,
} from "../serviceModules/weatherAPIService";

/* ----- API CALLS ----- */

/**
 * Retrieves and returns an array of weatherData objects for the specified location, including the current day.
 *
 * @param {string} location - The location for which to retrieve weather data (city name, zipcode or location ID returned by the search API).
 * @param {number} numOfDays - The number of days to retrieve weather forecast data (maximum 3).
 * @returns {Array<WeatherData>} An array of WeatherData objects containing formatted weather information for each forecasted day.
 */
export async function getWeatherForecast(location, numOfDays) {
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

/**
 * Fetches autofill options from the API based on the provided location search value.
 * @param {string} searchValue - The completed or incomplete location search value (city name or zipcode).
 * @returns {Promise<Array>} A promise that resolves to an array of autofill options from the API.
 */
export async function getSearchAutofillResults(searchValue) {
  try {
    const url = createApiUrl("search", searchValue);
    const response = await fetch(url, { mode: "cors" });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error(`Error fetching autofill options: ${error}`);
  }
}

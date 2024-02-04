import populateCurrentWeatherDisplay from "./currentWeatherDisplayController";
import populateForecastDisplay from "./forecastDisplayController";
import populateWeatherDetailDisplay from "./weatherDetailDisplayController";
import { getWeatherForecast } from "./weatherAPIController";

/**
 * Renders the weather dashboard with the specified city and location URL.
 *
 * This function fetches weather data for the given location, populates the current weather display,
 * forecast display, and weather detail display on the UI.
 *
 * @param {string} cityName - The name of the city for which the weather is displayed.
 * @param {string} locationURL - The URL or identifier for the location to fetch weather data.
 * @returns {void}
 */
export default function renderWeatherDashboard(cityName, locationURL) {
  const weatherData = getWeatherForecast(locationURL, 3);
  populateCurrentWeatherDisplay(cityName, weatherData);
  populateForecastDisplay(weatherData);
  populateWeatherDetailDisplay(weatherData);
}

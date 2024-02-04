import populateCurrentWeatherDisplay from "./currentWeatherDisplayController";
import populateForecastDisplay from "./forecastDisplayController";
import populateWeatherDetailDisplay from "./weatherDetailDisplayController";
import { getWeatherForecast } from "./weatherAPIController";

export function renderWeatherDashboard(cityName, locationURL) {
  const weatherData = getWeatherForecast(locationURL, 3);
  populateCurrentWeatherDisplay(cityName, weatherData);
  populateForecastDisplay(weatherData);
  populateWeatherDetailDisplay(weatherData);
}

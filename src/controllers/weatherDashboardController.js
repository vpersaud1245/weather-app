import populateCurrentWeatherDisplay from "./currentWeatherDisplayController";
import populateForecastDisplay from "./forecastDisplayController";
import populateWeatherDetailDisplay from "./weatherDetailDisplayController";

export default function renderWeatherDashboard(cityName, weatherData) {
  populateCurrentWeatherDisplay(cityName, weatherData);
  populateForecastDisplay(weatherData);
  populateWeatherDetailDisplay(weatherData);
}

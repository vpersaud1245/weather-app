import WeatherData from "./weatherData";

const KEY = "8a48ddac42884c79bcc05824242401";

/**
 * Creates the api call url for the given request and city
 * @param {*} requestType - "current", "forecast", "search"
 * @param {*} cityName
 * @returns {String}
 */
function createApiUrl(requestType, city) {
  return `http://api.weatherapi.com/v1/${requestType}.json?key=${KEY}&q=${city}&aqi=no`;
}

/**
 * Combines and formats the current and forecasted weather data for the current day
 * to create a new object with key data points.
 *
 * @param {string} city - The city for which the weather data is collected.
 * @param {object} currentWeatherData - Current weather object returned by the API.
 * @param {object} forecastedWeatherData - Forecasted weather object for the current day returned by the API.
 * @returns {WeatherData} A new WeatherData object containing formatted weather information.
 */
function createCurrentWeatherDataObject(
  city,
  currentWeatherData,
  forecastedWeatherData,
) {
  const forecastedDay = forecastedWeatherData.forecastday[0].day;
  const temp = Math.round(currentWeatherData.temp_f);
  const { condition } = currentWeatherData;
  const maxTemp = Math.round(forecastedDay.maxtemp_f);
  const minTemp = Math.round(forecastedDay.mintemp_f);
  const feelsLike = Math.round(currentWeatherData.feelslike_f);
  const chanceOfRain = forecastedDay.daily_chance_of_rain;
  const windMph = Math.round(currentWeatherData.wind_mph);
  const { humidity } = currentWeatherData;
  const { uv } = currentWeatherData;

  return new WeatherData(
    city,
    temp,
    condition,
    maxTemp,
    minTemp,
    feelsLike,
    chanceOfRain,
    windMph,
    humidity,
    uv,
  );
}

/**
 * Returns an object containing the current weather information for
 * the given location.
 * @param {String} location - City
 */
export default async function getCurrentWeather(city) {
  try {
    const url = createApiUrl("forecast", city);
    const response = await fetch(url, { mode: "cors" });
    console.log(`Response Status: ${response.status}`);
    const jsonData = await response.json();
    const currentWeatherData = jsonData.current;
    const forecastedWeatherData = jsonData.forecast;
    const weatherData = createCurrentWeatherDataObject(
      city,
      currentWeatherData,
      forecastedWeatherData,
    );
    return weatherData;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}

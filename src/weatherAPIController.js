const KEY = "8a48ddac42884c79bcc05824242401";

/**
 * Creates the api call url for the given request and city
 * @param {*} requestType - "current", "forecast", "search"
 * @param {*} cityName
 * @returns {String}
 */
function createApiUrl(requestType, cityName) {
  return `http://api.weatherapi.com/v1/${requestType}.json?key=${KEY}&q=${cityName}&aqi=no`;
}

/**
 * Returns an object containing the current weather information for
 * the given location.
 * @param {String} location - City Name
 */
export default async function getCurrentWeather(cityName) {
  try {
    const url = createApiUrl("forecast", cityName);
    const response = await fetch(url, { mode: "cors" });
    console.log(response.status);
    const currentWeatherData = await response.json();
    return currentWeatherData;
  } catch (error) {
    return `error: ${error}`;
  }
}

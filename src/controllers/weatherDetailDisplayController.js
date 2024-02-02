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
  const uvIndex = document.querySelector(".weather-details__data--uv-index");
  return { precipitation, feelsLike, humidity, windSpeed, uvIndex };
}

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

export default async function populateWeatherDetailDisplay(weatherData) {
  const weatherDetails = await getWeatherDetailValues(weatherData);
  const weatherDetailDomElements = getWeatherDetailDomElements();
  const DEGREE_SYMBOL = "&deg;";
  console.log(weatherDetails.precipitation);
  weatherDetailDomElements.precipitation.textContent = `${weatherDetails.precipitation}%`;
  weatherDetailDomElements.feelsLike.innerHTML =
    weatherDetails.feelsLike + DEGREE_SYMBOL;
  weatherDetailDomElements.humidity.textContent = `${weatherDetails.humidity}%`;
  weatherDetailDomElements.windSpeed.textContent = `${weatherDetails.windSpeed} mph`;
  weatherDetailDomElements.uvIndex.textContent = weatherDetails.uvIndex;
  const weatherDetailElement = document.querySelector(".weather-details");
  weatherDetailElement.style.display = "grid";
}

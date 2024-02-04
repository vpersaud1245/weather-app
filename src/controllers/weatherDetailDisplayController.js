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
  const precipitationTitle = document.querySelector(
    ".weather-details__title--precipitation",
  );
  const feelsLikeTitle = document.querySelector(
    ".weather-details__title--feels-like",
  );
  const windSpeedTitle = document.querySelector(
    ".weather-details__title--wind-speed",
  );
  const humidityTitle = document.querySelector(
    ".weather-details__title--humidity",
  );
  const uvIndexTitle = document.querySelector(
    ".weather-details__title--uv-index",
  );
  const uvIndex = document.querySelector(".weather-details__data--uv-index");
  return {
    precipitation,
    feelsLike,
    humidity,
    windSpeed,
    uvIndex,
    precipitationTitle,
    feelsLikeTitle,
    windSpeedTitle,
    humidityTitle,
    uvIndexTitle,
  };
}

function setWeatherDetailTitles() {
  const weatherDetailDomElements = getWeatherDetailDomElements();
  const { precipitationTitle } = weatherDetailDomElements;
  precipitationTitle.textContent = "PRECIPITATION";
  const { feelsLikeTitle } = weatherDetailDomElements;
  feelsLikeTitle.textContent = "FEELS LIKE";
  const { windSpeedTitle } = weatherDetailDomElements;
  windSpeedTitle.textContent = "WIND SPEED";
  const { humidityTitle } = weatherDetailDomElements;
  humidityTitle.textContent = "HUMIDITY";
  const { uvIndexTitle } = weatherDetailDomElements;
  uvIndexTitle.textContent = "UV INDEX";
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
  setWeatherDetailTitles();
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

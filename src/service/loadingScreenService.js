function getDomELements() {
  const currentWeatherContainer = document.querySelector(".current-weather");
  const weatherForecastContainer = document.querySelector(".weather-forecast");
  const weatherDetailPrecipitation = document.querySelector(
    ".weather-details__precipitation",
  );
  const weatherDetailFeelsLike = document.querySelector(
    ".weather-details__feels-like",
  );
  const weatherDetailWindSpeed = document.querySelector(
    ".weather-details__wind-speed",
  );
  const weatherDetailHumidity = document.querySelector(
    ".weather-details__humidity",
  );
  const weatherDetailUvIndex = document.querySelector(
    ".weather-details__uv-index",
  );
  const weatherDetails = document.querySelector(".weather-details");

  return [
    currentWeatherContainer,
    weatherForecastContainer,
    weatherDetailPrecipitation,
    weatherDetailFeelsLike,
    weatherDetailHumidity,
    weatherDetailWindSpeed,
    weatherDetailUvIndex,
    weatherDetails,
  ];
}

export function showSkeletonLoadingScreen() {
  const domElements = getDomELements();
  for (let i = 0; i < domElements.length; i += 1) {
    const element = domElements[i];
    element.setAttribute("ID", "skeleton");
  }
}

export function stopSkeletonLoading() {
  const domElements = getDomELements();
  domElements.forEach((element) => {
    element.removeAttribute("ID");
  });
}

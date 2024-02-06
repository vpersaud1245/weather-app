/**
 * Retrieves DOM elements for the skeleton loading screen.
 * @function
 * @returns {HTMLElement[]} - Array of DOM elements.
 */
function getSkeletonDomELements() {
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

/**
 * Displays the skeleton loading screen by adding the "skeleton" ID to specified DOM elements.
 * @function
 * @returns {void}
 */
export function showSkeletonLoadingScreen() {
  const domElements = getSkeletonDomELements();
  // Loop through elements and add skeleton ID
  domElements.forEach((element) => {
    element.setAttribute("ID", "skeleton");
  });
}

/**
 * Stops the skeleton loading screen by removing the "skeleton" ID from specified DOM elements.
 * @function
 * @returns {void}
 */
export function stopSkeletonLoading() {
  const domElements = getSkeletonDomELements();
  domElements.forEach((element) => {
    element.removeAttribute("ID");
  });
}

// function createOptionLoadingSpinner() {
//   const loadingSpinner = document.createElement("div");
//   loadingSpinner.classList.add("spinner");
//   return loadingSpinner;
// }

// export function showOptionLoadingWheel() {
//   const cancelButton = document.querySelector(".header__cancel-search-btn");
//   const header = document.querySelector(".header");
//   cancelButton.style.display = "none";
//   const loadingSpinner = createOptionLoadingSpinner();
//   header.append(loadingSpinner);
// }

// export function hideOptionLoadingWheel() {
//   const cancelButton = document.querySelector(".header__cancel-search-btn");
//   const loadingSpinner = document.querySelector(".spinner");
//   loadingSpinner.remove();
//   cancelButton.style.display = "inline";
// }

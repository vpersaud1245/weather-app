/**
 * Resets the weather dashboard by clearing and reinitializing the main content area.
 * This function sets the inner HTML of the main container with default weather display elements.
 * @function
 * @returns {void}
 */
export default function resetWeatherDashboard() {
  const weatherDashboardMain = document.querySelector(".main");
  weatherDashboardMain.innerHTML = `<main class="main">
      <div class="current-weather">
        <div class="current-weather__city"></div>
        <div class="current-weather__temperature"></div>
        <div class="current-weather__condition"></div>
        <div class="current-weather__high-low">
          <div class="current-weather__high-low--high"></div>
          <span class="high-low-temp__divider"></span>
          <div class="current-weather__high-low--low"></div>
        </div>
      </div>
      <div class="weather-details">
      <div class="weather-forecast">
      <h2 class="weather-forecast__title"></h2>
      <div class="weather-forecast-data">
        <div
          class="weather-forecast-data__forecast-item weather-forecast-data__forecast-item--today"
        ></div>
        <div
          class="weather-forecast-data__forecast-item weather-forecast-data__forecast-item--day-2"
        ></div>
        <div
          class="weather-forecast-data__forecast-item weather-forecast-data__forecast-item--day-3"
        ></div>
      </div>
    </div>
        <div class="weather-details__item weather-details__precipitation">
          <h2
            class="weather-details__title weather-details__title--precipitation"
          >
            <span class="title__label title__label--precipitation"></span>
          </h2>
          <p
            class="weather-details__data weather-details__data--precipitation"
          ></p>
        </div>
        <div class="weather-details__item weather-details__feels-like">
          <h2
            class="weather-details__title weather-details__title--feels-like"
          >
            <span class="title__label title__label--feels-like"></span>
          </h2>
          <p
            class="weather-details__data weather-details__data--feels-like"
          ></p>
        </div>
        <div class="weather-details__item weather-details__wind-speed">
          <h2
            class="weather-details__title weather-details__title--wind-speed"
          >
            <span class="title__label title__label--wind-speed"></span>
          </h2>
          <p
            class="weather-details__data weather-details__data--wind-speed"
          ></p>
        </div>
        <div class="weather-details__item weather-details__humidity">
          <h2 class="weather-details__title weather-details__title--humidity">
            <span class="title__label title__label--humidity"></span>
          </h2>
          <p
            class="weather-details__data weather-details__data--humidity"
          ></p>
        </div>
        <div class="weather-details__item weather-details__uv-index">
          <h2 class="weather-details__title weather-details__title--uv-index">
            <span class="title__label title__label--uv-index"></span>
          </h2>
          <p
            class="weather-details__data weather-details__data--uv-index"
          ></p>
        </div>
      </div>
    </main>`;
}

export default function populateCurrentWeatherDisplay(
  cityName,
  weatherDataArray,
) {
  const cityNameElement = document.querySelector(".current-weather__city");
  const currentTempElement = document.querySelector(
    ".current-weather__temperature",
  );
  const currentConditionElement = document.querySelector(
    ".current-weather__condition",
  );
  const highTempElement = document.querySelector(
    ".current-weather__high-low--high",
  );
  const lowTempElement = document.querySelector(
    ".current-weather__high-low--low",
  );

  weatherDataArray.then((array) => {
    const degreeSymbol = "&deg;";
    const currentWeatherData = array[0];
    cityNameElement.textContent = cityName;
    currentTempElement.innerHTML = `${currentWeatherData.temp}${degreeSymbol}`;
    currentConditionElement.textContent = currentWeatherData.condition.text;
    // FORMAT CONDITION TO ONE OR TWO WORDS MAX
    highTempElement.innerHTML = `${currentWeatherData.maxTemp}${degreeSymbol}`;
    lowTempElement.innerHTML = `${currentWeatherData.minTemp}${degreeSymbol}`;
  });
}

import { getDay, isToday, parse } from "date-fns";

const dayIndexMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
function getDayOfWeek(dateString) {
  const dateObj = parse(dateString, "yyyy-MM-dd", new Date());
  if (isToday(dateObj)) {
    return "Today";
  }
  const dayIndex = getDay(dateObj);
  return dayIndexMap[dayIndex];
}

function getForecastDomElements() {
  const day1Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--today",
  );
  const day2Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--day-2",
  );
  const day3Forecast = document.querySelector(
    ".weather-forecast-data__forecast-item--day-3",
  );

  return {
    day1Forecast,
    day2Forecast,
    day3Forecast,
  };
}

function clearForecastDisplay() {
  const weatherForecast = document.querySelector(".weather-forecast");
  weatherForecast.style.display = "none";
  const forecastItemElements = getForecastDomElements();
  forecastItemElements.day1Forecast.innerHTML = "";
  forecastItemElements.day2Forecast.innerHTML = "";
  forecastItemElements.day3Forecast.innerHTML = "";
}

function appendForecastDataElement(
  forecastedDay,
  forecastedConditionCode,
  forecastedHighTemp,
  forecastLowTemp,
  forecastItem,
) {
  const day = document.createElement("div");
  day.classList.add("forecast-item__day");
  day.textContent = forecastedDay;

  const conditionIcon = document.createElement("img");
  conditionIcon.classList.add("forecast-item__condition-icon");
  conditionIcon.alt = "condition-icon";

  const highLowWrapper = document.createElement("div");
  highLowWrapper.classList.add("forecast-item__high-low");

  const highTemp = document.createElement("div");
  highTemp.classList.add("forecast-item__high-low--high");
  highTemp.textContent = forecastedHighTemp;

  const lowTemp = document.createElement("div");
  lowTemp.classList.add("forecast-item__high-low--low");
  lowTemp.textContent = forecastLowTemp;

  highLowWrapper.append(highTemp, lowTemp);
  forecastItem.append(day, conditionIcon, highLowWrapper);
}

function displayWeatherForecast() {
  const weatherForecast = document.querySelector(".weather-forecast");
  weatherForecast.style.display = "block";
}

export default function populateForecastDisplay(weatherData) {
  weatherData.then((weatherDataArray) => {
    const forecastDomElements = getForecastDomElements();
    console.log(weatherDataArray);
    clearForecastDisplay();
    for (let i = 0; i < weatherDataArray.length; i += 1) {
      const forecastData = weatherDataArray[i];
      const dayNumber = i + 1;
      const forecastedDay = getDayOfWeek(forecastData.date);
      const forecastedConditionCode = forecastData.condition.code;
      const forecastedHighTemp = forecastData.maxTemp;
      const forecastLowTemp = forecastData.minTemp;
      appendForecastDataElement(
        forecastedDay,
        forecastedConditionCode,
        forecastedHighTemp,
        forecastLowTemp,
        forecastDomElements[`day${dayNumber}Forecast`],
      );
    }
    displayWeatherForecast();
  });
}

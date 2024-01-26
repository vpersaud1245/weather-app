import "./style.css";
import {
  getWeatherForecast,
  getSearchAutofillResults,
} from "./weatherAPIController";

console.log(getWeatherForecast("33838", "2"));
console.log(getSearchAutofillResults("33838"));
/**
 * Weather app features:
 * ----- DISPLAY -----
 * Background image changes with weather
 * Background image changes with time
 * Display Location, Temp, Condition, High and Low in center
 * 3 Forecast goes below the temperature:
 * * Forecast includes the day icon and high/low
 * List that goes below the forecast:
 * * Feels like (Thermal sensation)
 * * Rain Chance
 * * Wind speed
 * * Humidity
 * * UV Index
 * ----- SEARCH -----
 * Has loading icon
 * Will display all possible cities when typing
 * When clicked will display info for that city
 */

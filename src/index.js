import "./style.css";
import getCurrentWeather from "./weatherAPIController";

console.log(getCurrentWeather("tampa"));
/**
 * Weather app features:
 * ----- DISPLAY -----
 * Background image changes with weather
 * Background image changes with time
 * Display Location, Temp, Condition, High and Low in center
 * - Temp C, Condition,
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

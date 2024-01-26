/**
 * Represents weather data for a specific location and date.
 *
 * @class WeatherData
 * @property {string} location - The location for which the weather data is collected.
 * @property {object} condition - The weather condition.
 * @property {number} maxTemp - The maximum temperature.
 * @property {number} minTemp - The minimum temperature.
 * @property {string} date - The date for which the weather data is collected.
 * @property {number} temp - The current temperature.
 * @property {number} feelsLike - The "feels like" temperature.
 * @property {number} chanceOfRain - The chance of rain.
 * @property {number} windMph - The wind speed in miles per hour.
 * @property {number} humidity - The humidity percentage.
 * @property {number} uv - The UV index.
 */
export default class WeatherData {
  constructor(
    city,
    condition,
    maxTemp,
    minTemp,
    date,
    temp,
    localTime,
    feelsLike,
    chanceOfRain,
    windMph,
    humidity,
    uv,
  ) {
    this.city = city;
    this.temp = temp;
    this.condition = condition;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.date = date;
    this.localTime = localTime;
    this.feelsLike = feelsLike;
    this.chanceOfRain = chanceOfRain;
    this.windMph = windMph;
    this.humidity = humidity;
    this.uv = uv;
  }
}

export default class WeatherData {
  constructor(
    city,
    temp,
    condition,
    maxTemp,
    minTemp,
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
    this.feelsLike = feelsLike;
    this.chanceOfRain = chanceOfRain;
    this.windMph = windMph;
    this.humidity = humidity;
    this.uv = uv;
  }
}

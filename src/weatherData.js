export default class WeatherData {
  constructor(
    city,
    condition,
    maxTemp,
    minTemp,
    date,
    temp,
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
    this.feelsLike = 0 || feelsLike;
    this.chanceOfRain = 0 || chanceOfRain;
    this.windMph = 0 || windMph;
    this.humidity = 0 || humidity;
    this.uv = 0 || uv;
  }
}

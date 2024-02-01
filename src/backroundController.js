import "./assets/backgrounds/Weather=Clear,Moment=Day.png";
import "./assets/backgrounds/Weather=Clear,Moment=Night.png";
import "./assets/backgrounds/Weather=Cloudy,Moment=Day.png";
import "./assets/backgrounds/Weather=Cloudy,Moment=Night.png";
import "./assets/backgrounds/Weather=Partly Cloudy,Moment=Day.png";
import "./assets/backgrounds/Weather=Partly Cloudy,Moment=Night.png";
import "./assets/backgrounds/Weather=Rain,Moment=Day.png";
import "./assets/backgrounds/Weather=Rain,Moment=Night.png";
import "./assets/backgrounds/Weather=Snow,Moment=Day.png";
import "./assets/backgrounds/Weather=Snow,Moment=Night.png";
import "./assets/backgrounds/Weather=Storm,Moment=Day.png";
import "./assets/backgrounds/Weather=Storm,Moment=Night.png";

const clearBackgroundIDCodes = [1000];
const partyCloudyBackgroundIDCodes = [1003];
const cloudyBackgroundIDCodes = [1006, 1009, 1030, 1135, 1147];
const rainBackgroundIDCodes = [
  1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243,
];
const snowBackgroundIDCodes = [
  1066, 1069, 1072, 1114, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
  1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
];
const stormBackgroundIDCodes = [
  1273, 1276, 1279, 1282, 1087, 1117, 1246, 1246, 1087, 1117,
];

function getHourFromLocalTime(localTime) {
  return Number(localTime.slice(-5, -3));
}

function getTimeOfDay(hour) {
  if (hour >= 20 || hour <= 6) {
    return "Night";
  }
  return "Day";
}

function getWeatherConditionFromCode(backgroundIDCode) {
  if (clearBackgroundIDCodes.includes(backgroundIDCode)) return "Clear";
  if (partyCloudyBackgroundIDCodes.includes(backgroundIDCode))
    return "Partly Cloudy";
  if (cloudyBackgroundIDCodes.includes(backgroundIDCode)) return "Cloudy";
  if (rainBackgroundIDCodes.includes(backgroundIDCode)) return "Rain";
  if (snowBackgroundIDCodes.includes(backgroundIDCode)) return "Snow";
  if (stormBackgroundIDCodes.includes(backgroundIDCode)) return "Storm";
  return "Code not found";
}

export default function setBackgroundImg(backgroundIDCode, localTime) {
  const hour = getHourFromLocalTime(localTime);
  const timeOfDay = getTimeOfDay(hour);

  const condition = getWeatherConditionFromCode(backgroundIDCode);

  // Dynamically access the variable based on timeOfDay and weather condition
  const backgroundUrl = `http://localhost:3000/Weather=${condition},Moment=${timeOfDay}.png`;

  const currentWeatherElement = document.querySelector(".current-weather");
  currentWeatherElement.style.backgroundImage = `url(${backgroundUrl})`;
}

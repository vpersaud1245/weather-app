import getWeatherConditionFromCode from "./conditionCodeService";
import weatherConditionIcons from "../resources/weatherIcons";

export default function getWeatherIcon(weatherConditionCode) {
  const weatherCondition = getWeatherConditionFromCode(weatherConditionCode);
  return weatherConditionIcons[weatherCondition];
}

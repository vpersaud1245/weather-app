import getBackgroundImgUrl from "../serviceModules/backgroundImageService";

export default function setBackgroundImg(weatherConditonCode, localTime) {
  const backgroundUrl = getBackgroundImgUrl(weatherConditonCode, localTime);
  const currentWeatherElement = document.querySelector(".current-weather");
  currentWeatherElement.style.backgroundImage = `url(${backgroundUrl})`;
}

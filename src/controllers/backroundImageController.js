import getBackgroundImgUrl from "../serviceModules/backgroundImageService";

export default function setBackgroundImg(backgroundIDCode, localTime) {
  const backgroundUrl = getBackgroundImgUrl(backgroundIDCode, localTime);
  const currentWeatherElement = document.querySelector(".current-weather");
  currentWeatherElement.style.backgroundImage = `url(${backgroundUrl})`;
}

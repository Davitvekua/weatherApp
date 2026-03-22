import {
  favoriteCitiesArray,
  language,
  saveFavoriteCity,
  renderStartScreenBack,
} from "./main.js";
import { getCurrentWeather, getWeatherForecast } from "./fetch.js";
import { getConditionImagePath } from "./conditions.js";

export async function renderWeatherData(cityId) {
  let currentWatherData = await getCurrentWeather(cityId, language);
  let forecastWatherData = await getWeatherForecast(cityId, language);

  let currentTime = currentWatherData.location.localtime;
  let hour = Number(currentTime.split(" ")[1].split(":")[0]);

  let dateString = currentTime.replace(" ", "T");
  let currentDate = new Date(dateString);
  let currentDayNumber = currentDate.getDay();
  let weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So", "Mo", "Di"];

  const mainScreenEl = document.querySelector(".app");
  mainScreenEl.innerHTML = "";
  mainScreenEl.innerHTML = `<div class="main-display" style="background-image: linear-gradient(0deg, #0003, #0003), url('${getConditionImagePath(currentWatherData.current.condition.code, currentWatherData.current.is_day)}')">
        <div class="top-buttons">
          <button class="top-buttons__back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 bottomIcons"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg></button
          ><button class="top-buttons__favorite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 bottomIcons favorite-button"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </button>
        </div>
        <div class="weather-main-data">
          <div class="test"></div>
          <div class="weather-main-data__city-name" data-cityId="${cityId}" data-city="${currentWatherData.location.name}">
            ${currentWatherData.location.name}
          </div>
          <div class="weather-main-data__temperature">
            ${Math.floor(currentWatherData.current.temp_c)}°
          </div>
          <div class="weather-main-data__condition">
            ${currentWatherData.current.condition.text}
          </div>
          <div class="weather-main-data__peak-temberatures">
            <span class="weather-main-data__peak-temberatures__highest"
              >H:${Math.floor(forecastWatherData.forecast.forecastday[0].day.maxtemp_c)}°</span
            ><span class="weather-main-data__peak-temberatures__lowest"
              >T:${Math.floor(forecastWatherData.forecast.forecastday[0].day.mintemp_c)}°</span
            >
          </div>
        </div>
        <div class="hourly-forecast general-container">
        <div class="hourly-forecast__heading">
          Heute ${forecastWatherData.forecast.forecastday[0].day.condition.text}. Wind bis zu ${Math.floor(currentWatherData.current.wind_kph)} km/h.
        </div>
        <div class="hourly-forecast__details">
          <div class="hour-block">
            <div class="hour-block__hour">jetzt</div>
            <img class="hour-block__icon" src="https://${getHourlyIcon(0, hour)}" alt="Weather icon">
            <div class="hour-block__temperature">${getHourlyTemperature(0, hour)}°</div>
          </div> 
        </div>
      </div><div class="daily-forecast general-container">
        <div class="daily-forecast__heading">
          Vorhersage für die nächsten 3 Tage:
        </div>
        <div class="daily-forecast__day-one">
          <span>Heute</span> <img src="https://${forecastWatherData.forecast.forecastday[0].day.condition.icon}" alt="Weather icon"> <span>H:${Math.floor(forecastWatherData.forecast.forecastday[0].day.maxtemp_c)}° T:${Math.floor(forecastWatherData.forecast.forecastday[0].day.mintemp_c)} Wind: ${Math.floor(forecastWatherData.forecast.forecastday[1].day.maxtemp_c)} km/h</span>
        </div>
        <div class="daily-forecast__day-two">
          <span class="daily__day">${weekdays[currentDayNumber + 1]}</span> <img src="https://${forecastWatherData.forecast.forecastday[1].day.condition.icon}" alt="Weather icon"> <span>H:${Math.floor(forecastWatherData.forecast.forecastday[1].day.maxtemp_c)}° T:${Math.floor(forecastWatherData.forecast.forecastday[1].day.mintemp_c)} Wind: ${Math.floor(forecastWatherData.forecast.forecastday[1].day.maxtemp_c)} km/h</span>
        </div>
        <div class="daily-forecast__day-three">
          <span class="daily__day">${weekdays[currentDayNumber + 2]}</span> <img src="https://${forecastWatherData.forecast.forecastday[2].day.condition.icon}" alt="Weather icon"> <span>H:${Math.floor(forecastWatherData.forecast.forecastday[2].day.maxtemp_c)}° T:${Math.floor(forecastWatherData.forecast.forecastday[2].day.mintemp_c)} Wind: ${Math.floor(forecastWatherData.forecast.forecastday[2].day.maxtemp_c)} km/h</span>
        </div>
      </div>
      <div class="container-box">
        <div class="container-box__mini general-container"><p>Feuchtigkeit</p><h1>${forecastWatherData.current.humidity}%</h1>
        </div>
        <div class="container-box__mini general-container"><p>Gefühlt</p><h1>${forecastWatherData.current.feelslike_c}°</h1>
        </div>
        <div class="container-box__mini general-container"><p>Sonnenaufgang</p><h1>${forecastWatherData.forecast.forecastday[0].astro.sunrise.split(" ")[0]} Uhr</h1>
        </div>
        <div class="container-box__mini general-container"><p>Sonnenuntergang</p><h1>${Number(forecastWatherData.forecast.forecastday[0].astro.sunset.split(" ")[0].split(":")[0]) + 12}:${forecastWatherData.forecast.forecastday[0].astro.sunset.split(" ")[0].split(":")[1]} Uhr</h1>
        </div>
        <div class="container-box__mini general-container"><p>Niederschlag</p><h1>${forecastWatherData.current.precip_mm}mm</h1>
        </div>
        <div class="container-box__mini general-container"><p>UV-Index</p><h1>${forecastWatherData.current.uv}</h1>
        </div>
      </div>
      </div>
      `;

  function getHourlyTemperature(day, hour) {
    return forecastWatherData.forecast.forecastday[day].hour[hour].temp_c;
  }

  function getHourlyIcon(day, hour) {
    return forecastWatherData.forecast.forecastday[day].hour[hour].condition
      .icon;
  }

  let hourlyForecastDetailsEl = document.querySelector(
    ".hourly-forecast__details",
  );

  let i = hour;

  while (i <= 22) {
    hourlyForecastDetailsEl.innerHTML += `<div class="hour-block">
            <div class="hour-block__hour">${i + 1} Uhr</div>
             <img class="hour-block__icon" src="https://${getHourlyIcon(0, i)}" alt="Weather icon">
            <div class="hour-block__temperature">${getHourlyTemperature(0, i)}°</div>
          </div>`;
    i++;
  }

  i = 0;

  while (i <= hour - 1) {
    let zero;
    if (i < 10) {
      zero = 0;
    } else {
      zero = "";
    }
    hourlyForecastDetailsEl.innerHTML += `<div class="hour-block">
            <div class="hour-block__hour">${zero}${i} Uhr</div>
            <img class="hour-block__icon" src="https://${getHourlyIcon(1, i)}" alt="Weather icon">
            <div class="hour-block__temperature">${getHourlyTemperature(1, i)}°</div>
          </div>`;
    i++;
  }
  document
    .querySelector(".favorite-button")
    .addEventListener("click", saveFavoriteCity);

  document
    .querySelector(".top-buttons__back")
    .addEventListener("click", renderStartScreenBack);

  let typedCityId = cityId;

  if (favoriteCitiesArray.some((city) => city.cityId === cityId)) {
    document
      .querySelector(".favorite-button")
      .classList.add("favorite-button-filled");
  }
}

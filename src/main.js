import { getCurrentWeather, getWeatherForecast } from "./fetch";
import "./main.scss";

const currentLocation = "Ansbach";
const language = "de";

function renderLoadScreen() {
  const appScreen = document.querySelector(".app");
  appScreen.innerHTML = "";
  appScreen.innerHTML = `<div class="loading">
        <div class="loading__message">Daten für ${currentLocation} werden geladen</div>
        <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>
      `;
}

async function renderData() {
  let currentWatherData = await getCurrentWeather(currentLocation, language);
  let forecastWatherData = await getWeatherForecast(currentLocation, language);
  const weatherMainDataEl = document.querySelector(".app");
  weatherMainDataEl.innerHTML = "";
  weatherMainDataEl.innerHTML = `<div class="main-display">
        <div class="top-buttons">
          <button class="top-buttons__back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
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
              class="size-6"
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
          <div class="weather-main-data__city-name">
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
      </div>`;
}

async function init() {
  renderLoadScreen();
  await renderData();
}

init();

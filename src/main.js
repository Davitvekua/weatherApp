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

  let currentTime = currentWatherData.location.localtime;
  let hour = Number(currentTime.split(" ")[1].split(":")[0]);

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
      </div>
      </div>`;

  // start rendering of hourlyForecastDetails
  function getHourlyTemperature(day, hour) {
    return forecastWatherData.forecast.forecastday[day].hour[hour].temp_c;
  }

  function getHourlyIcon(day, hour) {
    return forecastWatherData.forecast.forecastday[day].hour[hour].condition
      .icon;
  }

  // getHourlyTemperature(, 1);

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
  // finish rendering of hourlyForecastDetails
}

async function init() {
  renderLoadScreen();
  await renderData();
}

init();

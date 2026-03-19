import { getCurrentWeather, getWeatherForecast } from "./fetch";
import { getConditionImagePath } from "./conditions";
import "./main.scss";

const language = "de";
let favoriteCitiesArray = [];

// Start Screen bauen

function renderStartScreen() {
  const mainScreenEl = document.querySelector(".app");
  mainScreenEl.innerHTML = "";
  mainScreenEl.innerHTML = `<div class="start-screen">
        <div class="top-menu">
          <div class="top-menu__heading">Wetter</div>
          <button class="top-menu__edit">bearbeiten</button>
        </div>
        <input
          class="search-input"
          type="text"
          placeholder="Nach Stadt suchen..."
        />
        <div class="start-screen__favorite-cities"></div>
      </div>`;

  document
    .querySelector(".search-input")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        rendertypedCity(event);
      }
    });

  document.querySelector(".top-menu__edit").addEventListener("click", () => {
    document
      .querySelectorAll(".favorite-city-container__delete-button")
      .forEach((el) => el.classList.toggle("delete-button-none"));

    if (
      document.querySelector(".top-menu__edit").textContent === "bearbeiten"
    ) {
      document.querySelector(".top-menu__edit").textContent = "Fertig";

      document
        .querySelectorAll(".favorite-city-container__delete-button")
        .forEach((el) => {
          el.addEventListener("click", (event) => {
            let currentContainer = event.target.closest(
              ".favorite-city-container__delete-button",
            ).dataset.city;
            console.log(currentContainer);
          });
        });
    } else if (
      document.querySelector(".top-menu__edit").textContent === "Fertig"
    ) {
      document.querySelector(".top-menu__edit").textContent = "bearbeiten";
    }
  });
}

async function saveFavoriteCity() {
  let desiredCity = document.querySelector(
    ".weather-main-data__city-name",
  ).innerText;

  if (favoriteCitiesArray.some((city) => city.cityName === desiredCity)) return;

  let FavoriteCity = {
    specialName: 1,
    cityName: desiredCity,
  };

  favoriteCitiesArray.push(FavoriteCity);

  localStorage.setItem("favoriteCities", JSON.stringify(favoriteCitiesArray));

  document
    .querySelector(".favorite-button")
    .classList.add("favorite-button-filled");
}

function createFavoriteCity(
  backgroundImage,
  dayNightIndicator,
  city,
  country,
  currentTemberature,
  condition,
  temberatureMax,
  temberatureMin,
) {
  let favoriteCityEl = document.querySelector(".start-screen__favorite-cities");
  favoriteCityEl.innerHTML += `<div class="favorite-city-container">
        <button class="favorite-city-container__delete-button delete-button-none" data-city="${city}"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 delete-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <span class="favorite-city" data-city="${city}" style="background-image: linear-gradient(0deg, #0002, #0002), url('${getConditionImagePath(backgroundImage, dayNightIndicator)}')"
          ><div class="favorite-city__name">
            <div class="favorite-city__name__city">${city}</div>
            <div class="favorite-city__name__country">${country}</div>
          </div>
          <div class="favorite-city__temperature">${currentTemberature}°</div>
          <div class="favorite-city__condition">${condition}</div>
          <div class="favorite-city__peak-temberatures">H:${temberatureMax}° T:${temberatureMin}°</div></span
        >
      </div>`;
}

async function renderFavoriteCites() {
  let favoriteCityEl = document.querySelector(".start-screen__favorite-cities");
  favoriteCityEl.innerHTML = "";

  favoriteCitiesArray =
    JSON.parse(localStorage.getItem("favoriteCities")) || [];

  // es rendert schneller aber ohne reihenfolge
  // favoriteCitiesArray.forEach(async (el) => {
  //   let currentWatherData = await getCurrentWeather(el.cityName, language);
  //   let forecastWatherData = await getWeatherForecast(el.cityName, language);
  //   createFavoriteCity(
  //     currentWatherData.current.condition.code,
  //     currentWatherData.current.is_day,
  //     currentWatherData.location.name,
  //     currentWatherData.location.country,
  //     Math.floor(currentWatherData.current.temp_c),
  //     currentWatherData.current.condition.text,
  //     Math.floor(forecastWatherData.forecast.forecastday[0].day.maxtemp_c),
  //     Math.floor(forecastWatherData.forecast.forecastday[0].day.mintemp_c),
  //   );
  // });

  for (let el of favoriteCitiesArray) {
    let currentWatherData = await getCurrentWeather(el.cityName, language);
    let forecastWatherData = await getWeatherForecast(el.cityName, language);
    createFavoriteCity(
      currentWatherData.current.condition.code,
      currentWatherData.current.is_day,
      currentWatherData.location.name,
      currentWatherData.location.country,
      Math.floor(currentWatherData.current.temp_c),
      currentWatherData.current.condition.text,
      Math.floor(forecastWatherData.forecast.forecastday[0].day.maxtemp_c),
      Math.floor(forecastWatherData.forecast.forecastday[0].day.mintemp_c),
    );
  }

  // funktioniert nicht, warum??????????????

  // document.querySelectorAll(".favorite-city").forEach((el) => {
  //   el.addEventListener("click", async (event) => {
  //     let city = event.target.closest(".favorite-city").dataset.city;
  //     await renderLoadScreen(city);
  //     await renderWeatherData(city);
  //   });
  // });
}

// Ende von Start Screen

function renderLoadScreen(city) {
  const mainScreenEl = document.querySelector(".app");
  mainScreenEl.innerHTML = "";
  mainScreenEl.innerHTML = `<div class="loading">
        <div class="loading__message">Daten für ${city} werden geladen</div>
        <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </div>
      `;
}

async function renderWeatherData(cityName) {
  let currentWatherData = await getCurrentWeather(cityName, language);
  let forecastWatherData = await getWeatherForecast(cityName, language);

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
  document
    .querySelector(".favorite-button")
    .addEventListener("click", saveFavoriteCity);

  document
    .querySelector(".top-buttons__back")
    .addEventListener("click", renderStartScreenBack);

  let typedCityName = cityName;

  if (favoriteCitiesArray.some((city) => city.cityName === typedCityName)) {
    document
      .querySelector(".favorite-button")
      .classList.add("favorite-button-filled");
  }
}

function renderStartScreenBack() {
  renderStartScreen();
  renderFavoriteCites();
  document.querySelector(".search-input").value = "";
}

async function rendertypedCity() {
  const inputDesiredCity = document.querySelector(".search-input");
  if (!inputDesiredCity) return;
  const city = inputDesiredCity.value;
  await renderLoadScreen(city);
  await renderWeatherData(city);
}

async function init() {
  await renderStartScreen();
  await renderFavoriteCites();
}

init();

// 1

async function renderClickedCity(event) {
  const el = event.target.closest(".favorite-city");
  if (!el) return;
  const city = el.dataset.city;
  await renderLoadScreen(city);
  await renderWeatherData(city);
}
document.addEventListener("click", renderClickedCity);

import { getConditionImagePath } from "./conditions.js";
import { renderStartScreen, renderFavoriteCites } from "./startScreen.js";
import { renderLoadScreen } from "./loadScreen.js";
import { renderWeatherData } from "./weatherDataScreen.js";
import "./styling/main.scss";
import { rendertypedCity } from "./searchScreen.js";

console.log("main.js geladen");

export const language = "de";
export let favoriteCitiesArray = [];

export async function saveFavoriteCity() {
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

export function createFavoriteCity(
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

export function renderStartScreenBack() {
  renderStartScreen();
  renderFavoriteCites();
  document.querySelector(".search-input").value = "";
}

export async function init() {
  await renderStartScreen();
  await renderFavoriteCites();
}

async function renderClickedCity(event) {
  const el = event.target.closest(".favorite-city");
  if (!el) return;
  const city = el.dataset.city;
  await renderLoadScreen(city);
  await renderWeatherData(city);
}
document.addEventListener("click", renderClickedCity);

// export async function rendertypedCity() {
//   const inputDesiredCity = document.querySelector(".search-input");
//   if (!inputDesiredCity) return;
//   const city = inputDesiredCity.value;
//   await renderLoadScreen(city);
//   await renderWeatherData(city);
// }

rendertypedCity();

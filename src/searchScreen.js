import { getSearchLocation } from "./fetch.js";
import { language } from "./main.js";

export async function rendertypedCity() {
  const inputDesiredCity = document.querySelector(".search-input");
  if (!inputDesiredCity) return;
  const city = inputDesiredCity.value;
  let searchOffers;

  if (city.length > 1) {
    console.log(await getSearchLocation(city, language));
    searchOffers = await getSearchLocation(city, language);
  }

  if (!searchOffers) return;

  let favoriteCitieEl = document.querySelector(
    ".start-screen__favorite-cities",
  );
  // favoriteCitieEl.innerHTML = "";
  let searchCityEl = document.querySelector(".search-container");
  searchCityEl.innerHTML = "";
  searchOffers.forEach((el) => {
    searchCityEl.innerHTML += `<div class="search-container__location">
  <div class="search-container__location__name">${el.name}</div>
  <div class="search-container__location__country">${el.country}</div></div>`;
  });

  //   await renderLoadScreen(city);
  //   await renderWeatherData(city);
}

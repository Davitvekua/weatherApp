import { getSearchLocation } from "./fetch.js";
import { language, rendertypedCity } from "./main.js";

export async function renderTypedCitiesInSearchBar() {
  const inputDesiredCity = document.querySelector(".search-input");
  if (!inputDesiredCity) return;
  const city = inputDesiredCity.value;
  let searchOffers;
  let searchCityEl = document.querySelector(".search-container");

  if (city.length > 1) {
    searchOffers = await getSearchLocation(city, language);
  } else {
    searchCityEl.innerHTML = "";
  }

  if (!searchOffers) return;

  searchCityEl.innerHTML = "";
  searchOffers.forEach((el) => {
    searchCityEl.innerHTML += `<div class="search-container__location" data-cityId="${el.id}" data-city="${el.name}">
  <div class="search-container__location__name">${el.name}</div>
  <div class="search-container__location__country">${el.country}</div></div>`;
  });
  rendertypedCity();

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".search-container-parent") &&
      !event.target.closest(".search-input")
    ) {
      document
        .querySelector(".search-container-parent")
        .classList.add("search-container-parent-hidden");
    } else if (
      event.target.closest(".search-container-parent") ||
      event.target.closest(".search-input")
    ) {
      document
        .querySelector(".search-container-parent")
        .classList.remove("search-container-parent-hidden");
    }
  });
}

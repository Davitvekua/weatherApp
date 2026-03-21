import { favoriteCitiesArray, language, createFavoriteCity } from "./main.js";
import { getCurrentWeather, getWeatherForecast } from "./fetch.js";
import { rendertypedCity } from "./searchScreen.js";

export function renderStartScreen() {
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
        <div class="search-container-parent"><div class="search-container"></div></div>
        <div class="start-screen__favorite-cities"></div>
      </div>`;

  document
    .querySelector(".search-input")
    .addEventListener("input", rendertypedCity);

  // document.querySelector(".search-input").addEventListener("input", (event) => {
  //   if (event.key === "Enter") {
  //     rendertypedCity(event);
  //   }
  // });

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
            let currentContainerCity = event.target.closest(
              ".favorite-city-container__delete-button",
            ).dataset.city;

            // favoriteCitiesArray = favoriteCitiesArray.filter(
            //   (el) => el.cityName !== currentContainerCity,
            // );

            let data = favoriteCitiesArray.filter(
              (el) => el.cityName !== currentContainerCity,
            );

            favoriteCitiesArray.length = 0;
            favoriteCitiesArray.push(...data);

            localStorage.setItem(
              "favoriteCities",
              JSON.stringify(favoriteCitiesArray),
            );

            el.parentElement.remove();
          });
        });
    } else if (
      document.querySelector(".top-menu__edit").textContent === "Fertig"
    ) {
      document.querySelector(".top-menu__edit").textContent = "bearbeiten";
    }
  });
}

export async function renderFavoriteCites() {
  let favoriteCityEl = document.querySelector(".start-screen__favorite-cities");
  favoriteCityEl.innerHTML = "";

  //   favoriteCitiesArray =
  //     JSON.parse(localStorage.getItem("favoriteCities")) || [];

  let data = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  favoriteCitiesArray.length = 0;
  favoriteCitiesArray.push(...data);

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
}

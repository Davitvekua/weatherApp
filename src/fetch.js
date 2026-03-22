const mainApi = `https://api.weatherapi.com/v1/`;
const personalkey = `key=809d5f390de3480fa3e125039260903`;

const currentWeatherApi =
  "https://api.weatherapi.com/v1/current.json?key=809d5f390de3480fa3e125039260903&q=id:2322383&lang=de";

export async function getCurrentWeather(cityId, language) {
  let request = await fetch(
    mainApi +
      `current.json?` +
      personalkey +
      `&q=id:` +
      cityId +
      `&lang=` +
      language,
  );
  let response = await request.json();
  return response;
}

const forecastWeatherApi =
  "https://api.weatherapi.com/v1/forecast.json?key=809d5f390de3480fa3e125039260903&q=id:2322383&lang=de&days=3";

export async function getWeatherForecast(cityId, language) {
  let request = await fetch(
    mainApi +
      `forecast.json?` +
      personalkey +
      `&q=id:` +
      cityId +
      `&lang=` +
      language +
      `&days=3`,
  );
  let response = await request.json();
  return response;
}

export async function getSearchLocation(location, language) {
  let request = await fetch(
    mainApi +
      `search.json?` +
      personalkey +
      `&q=` +
      location +
      `&lang=` +
      language +
      `&days=3`,
  );
  let response = await request.json();
  return response;
}

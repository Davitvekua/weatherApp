const mainApi = `https://api.weatherapi.com/v1/`;
const personalkey = `key=809d5f390de3480fa3e125039260903`;

const currentWeatherApi =
  "https://api.weatherapi.com/v1/current.json?key=809d5f390de3480fa3e125039260903&q=Ansbach&lang=de";

export async function getCurrentWeather(location, language) {
  let request = await fetch(
    mainApi +
      `current.json?` +
      personalkey +
      `&q=` +
      location +
      `&lang=` +
      language,
  );
  let response = await request.json();
  return response;
}

const forecastWeatherApi =
  "https://api.weatherapi.com/v1/forecast.json?key=809d5f390de3480fa3e125039260903&q=Ansbach&lang=de&days=2";

export async function getWeatherForecast(location, language) {
  let request = await fetch(
    mainApi +
      `forecast.json?` +
      personalkey +
      `&q=` +
      location +
      `&lang=` +
      language +
      `&days=2`,
  );
  let response = await request.json();
  return response;
}

// Imports
import { weatherCodes } from "../data/weatherCodes.js";

// HTML elements
const latitudeInput = document.querySelector("#latitude-input");
const longitudeInput = document.querySelector("#longitude-input");
const citySelector = document.querySelector("#city-dropdown");

const background = document.querySelector("#weather-background");

const weatherText = document.querySelector("#weather");
const temperatureText = document.querySelector("#temperature");

const icon = document.querySelector("#weather-icon");

// Variables

// Functions

function requestApi(lat, lon) {
  lat = lat || 0;
  lon = lon || 0;

  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&forecast_days=1`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => updateInterface(data))
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}

function updateInterface(apiData) {
  const weatherCode = apiData.current.weather_code;
  const temperature = apiData.current.temperature_2m;

  const weather = weatherCodes.find(
    (weatherObject) => weatherObject.code === weatherCode
  );

  console.log(weather.description, temperature);

  weatherText.textContent = weather.description;
  temperatureText.textContent = temperature;
}

// Event Functions

// using this to let the time for the user to write and not spam the API when he is writing
let timeoutId = null;
const keydownFunction = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    requestApi(latitudeInput.value, longitudeInput.value);
    timeoutId = null;
  }, 2000);
};

const citySelectorChanged = () => {
  const [lat, lon] = citySelector.value.split(",");
  requestApi(lat, lon);
};

// Init

citySelectorChanged();

// Events

citySelector.onchange = (event) => {
  citySelectorChanged();
};

latitudeInput.addEventListener("keydown", function (event) {
  keydownFunction();
});

longitudeInput.addEventListener("keydown", function (event) {
  keydownFunction();
});

// Adding custom console commands

const toggleCoordinatesMode = (bool) => {
  if (bool) {
    latitudeInput.classList.remove("hide");
    longitudeInput.classList.remove("hide");
    citySelector.classList.add("hide");

    return "Coordinates mode enabled!";
  } else {
    latitudeInput.classList.add("hide");
    longitudeInput.classList.add("hide");
    citySelector.classList.remove("hide");

    return "Coordinates mode disabled!";
  }
};

// Rendre la fonction accessible globalement
window.toggleCoordinatesMode = toggleCoordinatesMode;

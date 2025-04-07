// HTML elements
const latitudeInput = document.querySelector("#latitude-input");
const longitudeInput = document.querySelector("#longitude-input");

const background = document.querySelector("#weather-background");

const weatherText = document.querySelector("#weather");
const temperatureText = document.querySelector("#temperature");

const icon = document.querySelector("#weather-icon");

// Functions

function requestApi(lat, lon) {
  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&forecast_days=1`;

  console.log("Requesting API for weather infos.", lat, lon);
}

// Events

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

latitudeInput.addEventListener("keydown", function (event) {
  keydownFunction();
});

longitudeInput.addEventListener("keydown", function (event) {
  keydownFunction();
});

import { getWeather } from "./model.js";

let cityInput;
let dataReceived;
let weatherDOM = {};
let units = "metric";
let alertInput;

function cacheDOM() {
  cityInput = document.getElementById("city-input");
  weatherDOM.city = document.querySelector(".weather__city");
  weatherDOM.description = document.querySelector(".weather__description");
  weatherDOM.temp = document.querySelector(".weather__temp");
  weatherDOM.feel = document.querySelector(".weather__feels > p:last-child");
  weatherDOM.feelAfter = document.querySelector(".weather__feels");
  weatherDOM.wind = document.querySelector(".weather__wind > p:last-child");
  weatherDOM.rain = document.querySelector(".weather__rain > p:last-child");
  alertInput= document.querySelector("#city-not-found")
  window.addEventListener("keydown", updateWeather);
}

async function updateWeather(e) {
  try {
    if (!e) {
      cityInput.value = "Ottawa";
      dataReceived = await getWeather(cityInput.value, units);
      refreshDisplay(dataReceived);
    } else if (e.key == "Enter") {
      dataReceived = await getWeather(cityInput.value, units);
      refreshDisplay(dataReceived);
      return "Success";
    }
  } catch (err) {
    alterNotFound("Not found");
    console.log(err);
  }
}

// update the values on the webpage after entering a new city
function refreshDisplay(dataReceived) {
  alertInput.classList.remove("alter-transition");

  weatherDOM.description.textContent = `${dataReceived.weather[0].description}`;
  weatherDOM.city.textContent = `${dataReceived.name}, ${dataReceived.sys.country}`;
  weatherDOM.temp.textContent = `${Number(
    String(dataReceived.main.temp).slice(0, 2)
  )}`;
  weatherDOM.feel.textContent = `${Number(
    String(dataReceived.main.feels_like).slice(0, 2)
  )}`;
  weatherDOM.wind.textContent = `${dataReceived.wind.speed} ${
    units == "metric" ? "Kmh" : "mph"
  }`;
  weatherDOM.rain.textContent = `${
    dataReceived.rain ? dataReceived.rain["1h"] : "0"
  } mm`;
  if (units == "imperial") {
    weatherDOM.temp.classList.remove("weather__temp--C");
    weatherDOM.temp.classList.add("weather__temp--F");
    weatherDOM.feelAfter.classList.remove("weather__feels--C");
    weatherDOM.feelAfter.classList.add("weather__feels--F");
  } else {
    weatherDOM.temp.classList.remove("weather__temp--F");
    weatherDOM.temp.classList.add("weather__temp--C");
    weatherDOM.feelAfter.classList.remove("weather__feels--F");
    weatherDOM.feelAfter.classList.add("weather__feels--C");
  }
}

function checkUnits() {
  let unitToggle = document.querySelector(".form-check-input");
  unitToggle.addEventListener("click", setUnits);

  function setUnits(e) {
    if (e.target.checked) {
      units = "imperial";
    } else {
      units = "metric";
    }
    updateWeather();
  }
}

function alterNotFound(err) {
  alertInput.classList.add("alter-transition");
}

cacheDOM();
checkUnits();
updateWeather();

export { cacheDOM };

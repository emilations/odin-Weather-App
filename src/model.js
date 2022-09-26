let api = {
  weather: "5b06a6729ce438d4d332a8dc78d18dbe",
  giphy: "dBHNHTQzuJhvJ9g9hhdcYVm8ifjCECU4",
};

async function decodeGeoLocation() {

}

async function callWeatherApi(cord, unit) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cord.lat}&lon=${cord.lon}&appid=${api.weather}&units=${unit}`,
    { 
      method: "GET",
      mode: 'cors',
    }
  );
  let data = await response.json();
  return data;
}

export { callWeatherApi };
let api = {
  weather: "5b06a6729ce438d4d332a8dc78d18dbe",
  giphy: "dBHNHTQzuJhvJ9g9hhdcYVm8ifjCECU4",
};


// Call api using city name parameter intead of coordinates
async function getWeather(city, unit) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.weather}&units=${unit}`,
      { 
        method: 'GET',
        mode: 'cors',
      }
    );
    let data = await response.json();
    if (data.cod == '400') {
      throw ("Bad request - Probably empty city")
    }
    return data;
  } catch (err) {
    throw (err)
  }
}

export { getWeather };
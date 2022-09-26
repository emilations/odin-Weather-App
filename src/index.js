import {callWeatherApi} from "./model.js"

async function main(){

let coor = {
  "lat": "34.44",
  "lon": "-92.8"
}


  try {
    console.log(await callWeatherApi(coor,"metric"))
  } catch (err) {
    console.log(err)
  }

}

main();
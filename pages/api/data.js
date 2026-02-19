import { fetchWeatherApi } from "openmeteo";

export default async function handler(req, res) {
  const { config } = req.body;
  let weatherData = {
    "daily" : {
      "sunrise" : "",
      "sunset" : ""
    },
    "current" : {
      "time" : "",
      "temperature_2m" : "",
      "relative_humidity_2m" : "",
      "apparent_temperature" : "",
      "is_day" : "",
      "weather_code" : "",
      "wind_speed_10m" : "",
      "wind_direction_10m" : "",
      "visibility" : ""
    },
    "current_units" : {
      "time" : "",
      "temperature_2m" : "",
      "relative_humidity_2m" : "",
      "apparent_temperature" : "",
      "is_day" : "",
      "weather_code" : "",
      "wind_speed_10m" : "",
      "wind_direction_10m" : "",
      "visibility" : ""
    }
  }

  let url = "https://api.open-meteo.com/v1/forecast?";
  url += "latitude=" + config.latitude;
  url += "&longitude=" + config.longitude;
  url += "&daily=sunrise,sunset";
  url += "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,visibility";
  url += "&timezone=auto&forecast_days=1";
  if (config.unitSystem == "imperial"){
    url += "&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
  }
  let data = await fetch(url);
  weatherData = await data.json();
  weatherData.cityName = config.cityName;
  weatherData.countryCode = config.countryCode;
  weatherData.unitSystem = config.unitSystem;
  res.status(200).json(weatherData);
}

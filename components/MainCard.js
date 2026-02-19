import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  weatherData,
}) => {
  let iconName = "";
  const weatherCode = weatherData.current.weather_code;
  const isDay = weatherData.current.is_day;
  const weatherDecode = {
    "mainlyClear" : {
      "code" : [0,1],
      "description" : "clear sky",
    },
    "partlyClear" : {
      "code" : [2],
      "description" : "partly clear"
    },
    "overcast" : {
      "code" : [3],
      "description" : "overcast clouds"
    },
    "fog" : {
      "code" : [45,48],
      "description" : "haze"
    },
    "rain" : {
      "code" : [51,53,55,56,57,61,63,65,66,67,80,81,82],
      "description" : "rain"
    },
    "snow" : {
      "code" : [71,73,75,77,85,86],
      "description" : "snow"
    },
    "thunderstorm" : {
      "code" : [95,96,99],
      "description" : "thunderstorm"
    },
  }

  for (const condition in weatherDecode) {
    if (weatherDecode[condition].code.includes(weatherCode)){
      weatherData.description = weatherDecode[condition].description;
      iconName = condition;
    }
  }

  if(isDay){
    iconName += "Day";
  }else{
    iconName += "Night";
  }

  weatherData.icon = iconName;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {weatherData.cityName}, {weatherData.countryCode}
      </h1>
      <p className={styles.description}>{weatherData.description}</p>
      <Image
        width="300px"
        height="300px"
        src={`/icons/${weatherData.icon}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {weatherData.current.temperature_2m}{weatherData.current_units.temperature_2m}  
      </h1>
      <p>
        Feels like{" "}
        {weatherData.current.apparent_temperature}{weatherData.current_units.apparent_temperature}  
      </p>
    </div>
  );
};

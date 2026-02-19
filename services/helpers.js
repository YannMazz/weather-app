import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
  mToKm,
  ftToMiles
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibility) => {
  let convertedVisibility = "";
  if(visibility > 1000){
    if(unitSystem === "metric"){
      convertedVisibility = mToKm(visibility);
    } else {
      convertedVisibility = ftToMiles(visibility);
    }
  } else {
    convertedVisibility = visibility;
  }
  console.log(unitSystem);
  console.log(visibility);
  console.log(convertedVisibility);
  return convertedVisibility;
}

export const getVisibilityUnit = (unitSystem, visibility, visibilityUnit) => {
  let unit = "";
  if(visibility > 1000){
    if(unitSystem === "metric"){
      unit = "km";
    } else {
      unit = "mi";
    }
  } else {
    unit = visibilityUnit;
  }
  console.log(unitSystem);
  console.log(unit);
  return unit;
}
  
export const getTime = (unitSystem, currentTime) =>
  unitSystem == "metric"
    ? unixToLocalTime(currentTime)
    : timeTo12HourFormat(unixToLocalTime(currentTime));

export const getAMPM = (unitSystem, currentTime) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date(weatherData.current.time).getUTCDay()
  ];
};

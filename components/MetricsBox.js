import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getVisibilityUnit,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.current.relative_humidity_2m}
        unit={weatherData.current_units.relative_humidity_2m}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={weatherData.current.wind_speed_10m}
        unit={weatherData.current_units.wind_speed_10m}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.current.wind_direction_10m)}
      />
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(weatherData.unitSystem,weatherData.current.visibility)}
        unit={getVisibilityUnit(weatherData.unitSystem,weatherData.current.visibility,weatherData.current_units.visibility)}
      />
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          weatherData.unitSystem,
          weatherData.daily.sunrise[0]
        )}
        unit={getAMPM(
          weatherData.unitSystem,
          weatherData.daily.sunrise[0]
        )}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          weatherData.unitSystem,
          weatherData.daily.sunset[0]
        )}
        unit={getAMPM(
          weatherData.unitSystem,
          weatherData.daily.sunset[0]
        )}
      />
    </div>
  );
};

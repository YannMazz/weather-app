import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTime(
          weatherData.unitSystem,
          weatherData.current.time
        )} ${getAMPM(weatherData.unitSystem, weatherData.current.time)}`}
      </h2>
    </div>
  );
};

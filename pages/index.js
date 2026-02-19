import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const config = require('../public/config.json');
  const refreshTime = 3600000;
  const [weatherData, setWeatherData] = useState();

  const getData = async () => {
    const res = await fetch("api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config }),
    });
    const data = await res.json();
    setWeatherData({ ...data });
  };

  useEffect(() => {
    getData();
    const comInterval = setInterval(getData, refreshTime);
    return () => clearInterval(comInterval);
  }, []);

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData}/>
        </Header>
        <MetricsBox weatherData={weatherData}/>
      </ContentBox>
    </div>
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage="City not found, try again!">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;

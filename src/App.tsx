import React, { useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Slide,
  TextField,
  // Container,
  // Typography,
} from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Card from "./components/Card";

const API_KEY = "a113ddf4091f1abbc05a69bd8851df6f";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const IP_GEOLOCATION_BASE_URL = "https://ipapi.co/json/";
const queryClient = new QueryClient();

const fetchWeatherByCity = async (cityName: string) => {
  console.log(cityName, "On load")
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        q: cityName,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const fetchWeatherByLocation = async () => {
  const ipResponse = await axios.get(IP_GEOLOCATION_BASE_URL);
  const location = ipResponse.data;
  const lat = location.latitude;
  const lon = location.longitude;

  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
const fetchWeeklyWeatherByLocation = async () => {
  const ipResponse = await axios.get(IP_GEOLOCATION_BASE_URL);
  const location = ipResponse.data;
  const lat = location.latitude;
  const lon = location.longitude;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    // console.log("weekly weather data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly weather data:", error);
    throw error;
  }
};

const fetchWeeklyWeatherByCity = async (cityName: string) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: cityName,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly weather data:", error);
    throw error;
  }
};

const WeatherApp = () => {
  const [inputText, setInputText] = useState<string>("");
  const { data: locationData } = useQuery("location", fetchWeatherByLocation);
  const { data: locationWeeklyData } = useQuery(
    "weeklylocation",
    fetchWeeklyWeatherByLocation
  );
  const { data, isLoading, isError } = useQuery(
    ["weather", inputText],
    () => fetchWeatherByCity(inputText),
    {
      enabled: !!inputText,
    }
  );
  const {
    data: weeklyData,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useQuery(
    ["weeklyWeather", inputText],
    () => fetchWeeklyWeatherByCity(inputText),
    {
      enabled: !!inputText,
    }
  );
  // console.log("Weekly Data:", weeklyData);
  // console.log("Weekly Data by Location:", locationWeeklyData);
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputText(e.currentTarget.value);
      setInputText("");
    }
  }
  let isDay = false;
  if(data) {
    isDay = data?.dt > data?.sys.sunrise && data?.dt < data?.sys.sunset;
  } else {
    isDay = locationData?.dt > locationData?.sys.sunrise && locationData?.dt < locationData?.sys.sunset;
  }
  console.log(locationData, data);
  // useEffect(() => {

  // }, [])
  return (
    <div
      className={`bg_img ${isDay ? "" : "night_bg_img"}`}
      // style={
      //   isDay
      //     ? { backgroundImage: `${Night_BG}` }
      //     : { backgroundImage: `${BG}` }
      // }
      // style={{
      //   background: isDay ? "" : "",
      // }}
    >
      <div className="bg_left">
        <TextField
          variant="filled"
          label="Search location"
          className="input"
          error={isError}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onSubmit={handleSearch}
        />
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <p>Error fetching weather data</p>
        ) : (
          <>
            <h1 className="city">{data?.name || locationData?.name}</h1>
            <div className="group">
              <img
                src={`http://openweathermap.org/img/wn/${
                  data?.weather[0]?.icon || locationData?.weather[0]?.icon
                }@2x.png`}
                alt=""
              />
              <h1>
                {data?.weather[0]?.main || locationData?.weather[0]?.main}
              </h1>
            </div>
            <h1>
              Temperature:
              {data?.main.temp.toFixed() || locationData?.main.temp.toFixed()}°C
            </h1>
            {/* <p style={{ background: isDay ? "yellow" : "blue" }}>
              {isDay ? "Day" : "Night"}
            </p> */}
            <Slide direction="right" timeout={800} in={!isLoading}>
              <div className="box_container">
                <div className="box">
                  <p>Time</p>
                  <h1>{new Date().toLocaleTimeString()}</h1>
                </div>
                <div className="box">
                  <p>Wind</p>
                  <h1>{data?.wind.speed || locationData?.wind.speed} km/h</h1>
                </div>
                <div className="box">
                  <p>Weather</p>
                  <h1>
                    {data?.weather[0]?.description ||
                      locationData?.weather[0]?.description}
                  </h1>
                </div>
              </div>
            </Slide>

            <TopButtons />
          </>
        )}
      </div>
      <div className="bg_right">
        <Card
          isWeeklyLoading={isWeeklyLoading}
          isWeeklyError={isWeeklyError}
          weeklyData={weeklyData}
          locationWeeklyData={locationWeeklyData}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;

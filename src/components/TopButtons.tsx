/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Container } from "@mui/material";
import moment from "moment";
// import axios from 'axios';
import "./TopButtons.css";

interface City {
  id: number;
  title: string;
}
interface WeatherData {
  name: string;
  weather: Weather[];
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  }
  timezone: number
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
}

interface Weather {
  icon: string;
  main: string;
}

function TopButtons() {
    const cities: City[] = [
      {
        id: 1,
        title: "Accra",
      },
      {
        id: 2,
        title: "Addis Ababa",
      },
      {
        id: 3,
        title: "Nairobi",
      },
      {
        id: 4,
        title: "Johannesburg",
      },
      {
        id: 5,
        title: "Cairo",
      },
      {
        id: 6,
        title: "Abidjan",
      },
    ];
  const [cityNames, setCityNames] = useState<any>(cities.map((city)=>city.title));
  const [data, setData] = useState<WeatherData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCity (cityParams:string){
    console.log(cityParams)
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityParams}&appid=a113ddf4091f1abbc05a69bd8851df6f&units=metric`)
        if (response.status === 200) {
        setError(false);
        const data = await response.json();
        return data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch(err){
        setError(true);
        console.error(error);
    }finally{
        setLoading(false);
    }
  }  

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await Promise.all(
        cities.map(async (cityName: City) => {
          return fetchCity(cityName.title);
        })
      );

      // const testData = await fetchCity(cityName);

      setData(fetchedData);
    }


    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('final data', data)
  

  return (
    <div className="topnav_wrapper">
      <div className="date_format">
        <div>{moment().format("dddd")}</div>
        <div>
          <p>{moment().format("LLL")}</p>
        </div>
      </div>
      <div className="grid">
        {data.map((city, index) => {
            const isDay =
              city?.dt > city?.sys.sunrise && city?.dt < city?.sys.sunset;
            const localTime = moment().utcOffset(
              city.timezone / 60
            );
            return (
              <div
                key={index}
                className="gridItem"
                style={{
                  background: isDay
                    ? ""
                    : "linear-gradient(0.25turn, #f1e3e3, #021f42)",
                }}
              >
                <div className="gridItem_top">
                  <img
                    src={`http://openweathermap.org/img/wn/${city.weather[0]?.icon}@2x.png`}
                    alt=""
                  />
                  <p className="cityname">{city.name}</p>
                </div>
                <div className="grouping">
                  <p>{city.weather[0]?.main}</p>
                  <p className="temperature">{city.main.temp.toFixed()}°C </p>
                  <p>{localTime.format("HH:mm")}</p>
                  <p style={{ color: isDay ? "blue" : "black" }}>
                    {isDay ? "Day" : "Night"}
                  </p>
                </div>
              </div>
            );
        })}
        
      </div>
    </div>
  );
}

export default TopButtons;

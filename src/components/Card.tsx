import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import "./Card.css";

interface Props {
  isWeeklyError: Boolean;
  isWeeklyLoading: Boolean;
  weeklyData: {
    cod: string;
    message: number;
    list: Array<
      Record<
        string,
        | string
        | number
        | Record<string, string | number>
        | Array<Record<string, string | number>>
      >
    >;
  };
  locationWeeklyData: {
    cod: string;
    message: number;
    list: Array<
      Record<
        string,
        | string
        | number
        | Record<string, string | number>
        | Array<Record<string, string | number>>
      >
    >;
  };
}

const Card = ({
  isWeeklyError,
  isWeeklyLoading,
  weeklyData,
  locationWeeklyData,
}: Props) => {
  // console.log(locationWeeklyData?.list);
  const [locationWeek, setLocationWeek] = useState<any>();
  const [searchWeek, setSearchWeek] = useState<any>()

  useEffect(() => {
    if (locationWeeklyData) {
      const newArray = locationWeeklyData.list.map((item: any) => {
        const date = new Date(item.dt * 1000);
        const time = date.getDay();
        return { ...item, timeNumber: time };
      });
      // console.log(newArray)
      const arr = newArray.map(({ timeNumber }) => timeNumber);
      const dateArray = newArray.filter(
        ({ timeNumber }, index) => !arr.includes(timeNumber, index + 1)
      );
      setLocationWeek(dateArray)
    }
  }, [locationWeeklyData]);

   useEffect(() => {
     if (weeklyData) {
       const newArrays = weeklyData.list.map((item: any) => {
         const date = new Date(item.dt * 1000);
         const time = date.getDay();
         return { ...item, timeNumber: time };
       });
      //  console.log(newArrays);
       const arr = newArrays.map(({ timeNumber }) => timeNumber);
       const dateArray = newArrays.filter(
         ({ timeNumber }, index) => !arr.includes(timeNumber, index + 1)
       );
       setSearchWeek(dateArray);
     }
   }, [weeklyData]);

  // useEffect(() => {
  //   console.log(searchWeek);
  // }, [searchWeek]);

  return (
    <div className="weatherCard">
      <h2 className="weatherCard_h2">Weekly weather Report</h2>
      <>
        {isWeeklyLoading ? (
          <CircularProgress />
        ) : isWeeklyError ? (
          <p>Error fetching weekly weather data</p>
        ) : (
          <div className="weekly-forecast">
            {searchWeek?.slice(0, 2).map((item: any) => {
              const day = new Date(item.dt * 1000);
              return (
                <div className="weekly-box" key={item.dt}>
                  <p>{day.toDateString()}</p>
                  {/* <p>{item.dt_txt}</p> */}
                  <div className="weekly_box_details">
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                      alt=""
                    />
                    <h4>{item.weather[0].main}</h4>
                    <h4>{item.main.temp}°C</h4>
                  </div>
                </div>
              );
            })}
            {locationWeek?.map((items: any) => {
              const day = new Date(items.dt * 1000);
              return (
                <div className="weekly-box" key={items.dt}>
                  <p>{day.toDateString()}</p>
                  {/* <p>{new Date(items.dt * 1000).toLocaleDateString()}</p> */}
                  {/* <p>{items.dt_txt}</p> */}
                  <div className="weekly_box_details">
                    <img
                      src={`http://openweathermap.org/img/wn/${items.weather[0]?.icon}@2x.png`}
                      alt=""
                    />
                    <h4>{items.weather[0].main}</h4>
                    <h4>{items.main.temp}°C</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default Card;

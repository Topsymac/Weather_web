import React from 'react'
import { Typography } from "@mui/material";
import "./weather.css"

const Weather = () => {
  return (
    <div className="weather_wrapper">
      <div className="weather_hero">
        <div className="hero_left">
          <div className="hero_left_top">
            <div>
              <Typography variant="h5">Lagos</Typography>
            </div>
            <div>
              <p>Today 00:32 PM</p>
            </div>
          </div>
          <div className="hero_left_middle">
            <Typography variant="h1">14&deg;</Typography>
            <p>Mostly clear</p>
          </div>
          <div className="hero_left_bottom">
            <div>
              <p>720hps</p>
            </div>
            <div>
              <p>32%</p>
            </div>
            <div>
              <p>12km/hr</p>
            </div>
          </div>
        </div>
        <div className="hero_right">
          <div className="hero_right_top">
            <p>Temperature</p>
          </div>
          <div className="hero_right_middle">Graph</div>
          <div className="hero_right_bottom">
            <div className="">
              <p>Morning</p>
              <p>15&deg;</p>
            </div>
            <div>
              <p>Afternoon</p>
              <p>14&deg;</p>
            </div>
            <div>
              <p>Evening</p>
              <p>16&deg;</p>
            </div>
            <div>
              <p>Night</p>
              <p>12&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <div className="weather_content"></div>
    </div>
  );
}

export default Weather
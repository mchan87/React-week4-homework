import React, { useState } from "react";
import "./Weather.css";
import Cloudsbackground from "./images/Cloudsbg.jpg";
import axios from "axios";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.main.wind.speed,
      city: response.data.name,
      description: response.data.weather[0],
      iconUrl: "https://ss1.gstatic.com/onebox/weather/64/partly_cloudy.png",
      date: "Wednesday, July 27",
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div
          className="picture-background"
          style={{
            backgroundImage: `url(${Cloudsbackground})`,
            backgroundSize: "cover",
          }}
        >
          <span className="row">
            <span className="col-4">
              <h1>Last updated:</h1>
              <ul>
                <li>{weatherData.date}</li>
              </ul>
            </span>
            <span className="col-5 current-temp-box">
              <h1>Current Temperature in:</h1>
              <h2>{weatherData.city}</h2>
              <h2 className="currentdegree">
                <span>{Math.round(weatherData.temperature)}</span>°
                <a href className="active">
                  C
                </a>{" "}
                |<a href>F</a> <br />
                <img
                  src="{weatherData.iconUrl}"
                  alt="{weatherData.description}"
                  id="icon"
                  className="float-left"
                />
              </h2>
            </span>
            <span className="col-3">
              <h2 className="current-high">
                High:{" "}
                <span className="current-hightemp">{weatherData.hightemp}</span>{" "}
                °C
              </h2>
              <h2 className="current-low">
                Low:{" "}
                <span className="current-lowtemp">{weatherData.lowtemp}</span>{" "}
                °C
              </h2>
              <h2 className="current-weatherconditions">
                Weather Conditions:
                <span className="weather-conditions text-capitalize">
                  {weatherData.description}
                </span>
              </h2>
              <h2 className="current-windspeed">
                Windspeed (m/s):{" "}
                <span className="wind-speed">{weatherData.wind}</span>
              </h2>

              <button
                type="button"
                className="btn btn-success currentLocation-button"
              >
                Current Location
              </button>
            </span>
          </span>

          <form className="form-inline" id="search-form" autoComplete="off">
            <div className="row">
              <div className="col-9">
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    type="text"
                    className="form-control choosecity-box"
                    id="inputPassword2"
                    placeholder="Where should we go?"
                  />
                </div>
              </div>
              <div className="col-2">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 go-button"
                >
                  GO!
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="source-code">
          <a
            href="https://github.com/mchan87/Weather-App"
            target="_blank"
            rel="noopener noreferrer"
          >
            <a href="https://github.com/mchan87/React-week4-homework">
              Open-source code
            </a>
          </a>
          by Mary Chan
        </div>
      </div>
    );
  } else {
    const apiKey = `23dfd4fdb62616db7596711d60c872c7`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "Loading...";
  }
}

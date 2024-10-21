//STYLES
import "../styles/weatherCard.css";
import "../styles/weatherDetails.css";

//AXIOS
import axios from "axios";

//STATES
import React, { useState, useEffect } from "react";

//COMPONENTS
import WeatherDetails from "./WeatherDetails";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";
  const locationQuery = "Frankfurt";

  useEffect(() => {
    const fetchLocation = () => {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${locationQuery}`
      )
        .then((response) => response.json())
        .then((locationResponse) => {
          const key = locationResponse[0].Key;
          setLocation(key);
        });
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherData = () => {
      if (location) {
        fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}`
        )
          .then((response) => response.json())
          .then((weatherResponse) => {
            setWeather(weatherResponse[0]);
            console.log("Json", weatherResponse[0]);
          });
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div className="weather-card">
      <h2 className="location">{locationQuery}</h2>
      <WeatherDetails weather={weather} />
    </div>
  );
};

export default WeatherCard;

//STYLES
import "../styles/weatherCard.css";
import "../styles/weatherDetails.css";

//STATES
import React, { useState, useEffect } from "react";

//COMPONENTS
import WeatherDetails from "./WeatherDetails";
import Date from "./Date";
import SearchButton from "./SearchButton";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [newLocation, setNewLocation] = useState("Frankfurt");

  const apiKey = "NaFG2bOKhLCQbPvWNsptFeq1qNsYfAWh";

  useEffect(() => {
    const fetchLocation = () => {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${newLocation}`
      )
        .then((response) => response.json())
        .then((locationResponse) => {
          const key = locationResponse[0].Key;
          setLocation(key);
        });
    };

    fetchLocation();
  }, [newLocation]);

  useEffect(() => {
    const fetchWeatherData = () => {
      if (location) {
        fetch(
          `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
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

  const handleCitySearch = (weatherUpdate, newCity) => {
    setWeather(weatherUpdate);
    setNewLocation(newCity);
    setLocation(null);
  };

  return (
    <div className="weather-card">
      <Date />
      <h2 className="location">{newLocation}</h2>
      <WeatherDetails weather={weather} />
      <SearchButton onCitySearch={handleCitySearch} />
    </div>
  );
};

export default WeatherCard;

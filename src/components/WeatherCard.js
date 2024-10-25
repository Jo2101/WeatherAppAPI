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
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("Frankfurt");

  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";

  useEffect(() => {
    const fetchLocation = () => {
      fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${newLocation}`
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
          `https://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
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

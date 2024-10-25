//STYLES
import "../styles/weatherCard.css";
import "../styles/weatherDetails.css";

//STATES
import React, { useState, useEffect } from "react";

//COMPONENTS
import WeatherDetails from "./WeatherDetails";
import Date from "./Date";
import SearchButtonTest from "./SearchButtonTestV2";

const WeatherCard = () => {
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("Frankfurt");
  const [error, setError] = useState("");

  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${newLocation}`
        );

        const locationResponse = await response.json();
        if (!locationResponse[0].ok) {
          throw new Error("Trenutno nemamo podataka za ovaj grad");
        }
        const key = locationResponse[0].Key;

        setLocation(key);
        setError("");
      } catch (error) {
        setError(error.message);
        setLocation("");
      }
    };

    fetchLocation();
  }, [newLocation]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        try {
          const response = await fetch(
            `https://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
          );

          if (!response.ok) {
            throw new Error("Nema podataka");
          }
          const weatherResponse = await response.json();
          setWeather(weatherResponse[0]);
          console.log("Vrijeme", weatherResponse);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchWeatherData();
  }, [location]);

  const handleCitySearch = (weatherUpdate, newCity) => {
    setWeather(weatherUpdate);
    setNewLocation(newCity);
    setLocation(null);
    setError("");
  };

  return (
    <div className="weather-card">
      <Date />
      <h2 className="location">{newLocation}</h2>
      <WeatherDetails weather={weather} />
      <SearchButtonTest onCitySearch={handleCitySearch} />
      <div className="error">{error ? <p>{error.message}</p> : null} </div>
    </div>
  );
};

export default WeatherCard;

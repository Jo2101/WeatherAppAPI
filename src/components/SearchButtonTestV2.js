import { useEffect, useState } from "react";
import "../styles/searchButton.css";

const SearchButton = ({ onCitySearch }) => {
  const [citySearchInput, setCitySearchInput] = useState(""); //cuva za input polje
  const [citySearch, setCitySearch] = useState(""); // cuva za pretragu grda
  const [location, setLocation] = useState(""); // cuva lokaciju
  const [error, setError] = useState(""); // pampti greske
  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${citySearch}`
        );
        const cityResponse = await response.json();
        console.log("API Response:", cityResponse);
        if (!cityResponse[0].ok) {
          throw new Error("Trenutno nemamo podataka za unijeseni grad");
        }
        const key = cityResponse[0].Key;
        setLocation(key);
        setError("");
      } catch (error) {
        setError(error.message);
        setLocation("");
      }
    };
    if (citySearch) {
      fetchCities();
    }
  }, [citySearch]);

  const fetchWeatherCityData = async () => {
    if (location) {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
        );
        if (!response.ok) {
          throw new Error("Nema vremenskih podataka za uneseni grad");
        }
        const weatherResponse = await response.json();
        onCitySearch(weatherResponse[0], citySearch);
      } catch (error) {
        setError(error.message);
        setLocation("");
      }
    }
  };

  const handleSearchWeather = () => {
    if (location) {
      fetchWeatherCityData();
    }
  };

  const handleInputChange = (e) => {
    setCitySearchInput(e.target.value);
  };

  const handleSetCitySearch = () => {
    setCitySearch(citySearchInput);
    setLocation(null, citySearchInput);
  };

  return (
    <div className="searchButton">
      <input
        type="text"
        placeholder="Search location"
        value={citySearchInput}
        onChange={handleInputChange}
      />
      <div className="buttons">
        <button onClick={handleSetCitySearch}>Search city</button>
        <button onClick={handleSearchWeather}>Search weather</button>
      </div>
      <div>{error ? <p>{error}</p> : null} </div>
    </div>
  );
};

export default SearchButton;

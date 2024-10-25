import { useEffect, useState } from "react";
import "../styles/searchButton.css";

const SearchButton = ({ onCitySearch }) => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";

  useEffect(() => {
    const fetchCities = () => {
      try {
        fetch(
          `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${citySearch}`
        )
          .then((response) => response.json())
          .then((cityResponse) => {
            if (!cityResponse[0]) {
              throw new Error("Trenutno nemamo podataka za uneseni grad");
            }
            const key = cityResponse[0].Key;
            setLocation(key);
            setError("");
          });
      } catch (error) {
        setError(error.message);
        setLocation("");
      }
    };

    if (citySearch) {
      fetchCities();
    }
  }, [citySearch]);

  const fetchWeatherCity = () => {
    if (location) {
      fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
      )
        .then((response) => {
          if (!response) {
            throw new Error("Nema podataka");
          }
          return response.json();
        })
        .then((weatherResponse) => {
          onCitySearch(weatherResponse[0], citySearch);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleClickCitySearch = () => {
    fetchWeatherCity();
  };

  return (
    <div className="searchButton">
      <input
        type="text"
        placeholder="Search location.."
        value={citySearchInput}
        onChange={(e) => setCitySearchInput(e.target.value)}
      />
      <button onClick={() => setCitySearch(citySearchInput)}>
        Search city
      </button>
      <button onClick={handleClickCitySearch}>Search weather</button>
      <div>{error ? <p>{error}</p> : null}</div>
    </div>
  );
};

export default SearchButton;

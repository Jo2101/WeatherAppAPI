import { useEffect, useState } from "react";
import "../styles/searchButton.css";

const SearchButton = ({ onCitySearch }) => {
  const [citySearch, setCitySearch] = useState(null);
  const [location, setlocation] = useState(null);
  const apiKey = "NaFG2bOKhLCQbPvWNsptFeq1qNsYfAWh";

  useEffect(() => {
    const fetchCities = () => {
      fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${citySearch}`
      )
        .then((response) => response.json())
        .then((cityResponse) => {
          const key = cityResponse[0].Key;
          setlocation(key);
        });
    };

    if (citySearch) {
      fetchCities();
    }
  }, [citySearch, apiKey]);

  const fetchWeatherCity = () => {
    if (location) {
      fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${location}?apikey=${apiKey}&details=true`
      )
        .then((response) => response.json())
        .then((weatherResponse) => {
          onCitySearch(weatherResponse[0], citySearch);
        });
    }
  };
  const handleClick = () => {
    fetchWeatherCity();
  };
  return (
    <div className="searchButton">
      <input
        type="text"
        placeholder="Search location.."
        value={citySearch}
        onChange={(event) => setCitySearch(event.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default SearchButton;

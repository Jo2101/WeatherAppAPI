//STYLES
import "../styles/weatherCard.css";
import "../styles/weatherInfo.css";
import "../styles/weatherLocation.css";
import "../styles/highLowTemperature.css";

//JSON
import data from "../data/weather.json";

//ICONS
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

const WeatherCard = () => {
  const backgroundImage =
    data.icon == "moonLogo"
      ? data.backgroundImageNight
      : data.backgroundImageDay;
  return (
    <div
      className="weather-card"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>{data.icon == "moonLogo" ? <MoonIcon /> : <SunIcon />} </div>
      <div className="weather-location">
        <h2 className="location">{data.location}</h2>
        <h3 className="temperature">{data.temperature}°</h3>
      </div>
      <div className="weather-info">
        <h3 className="realFeel">Feels Like: {data.feels_like}°</h3>
        <div className="highLowTemperature">
          <p>H: {data.high}°</p>
          <p>L:{data.low}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

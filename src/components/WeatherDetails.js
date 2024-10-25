import "../styles/weatherDetails.css";

const WeatherDetails = ({ weather }) => {
  if (!weather) {
    return <p></p>;
  }
  const icon = String(weather.WeatherIcon).padStart(2, "0");
  return (
    <div className="weather-details">
      <div className="img">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png `}
          alt="Weather icon"
        />
      </div>
      <div className="temperature">{weather.Temperature.Metric.Value}°c</div>

      <h3 className="condition">{weather.WeatherText}</h3>
      <h3 className="minMaxTeperature">
        {weather.TemperatureSummary.Past6HourRange.Minimum.Metric.Value}°c /{" "}
        {weather.TemperatureSummary.Past6HourRange.Maximum.Metric.Value}°c
      </h3>
    </div>
  );
};

export default WeatherDetails;

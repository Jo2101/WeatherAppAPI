const WeatherDetails = ({ weather }) => {
  return (
    <div className="weather-details">
      <h3 className="temperature">{weather.Temperature.Metric.Value}°C</h3>
      <h3 className="condition">{weather.WeatherText}</h3>
    </div>
  );
};

export default WeatherDetails;

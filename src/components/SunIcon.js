import data from "../data/weather.json";
import sunLogo from "../img/sunLogo.png";
import moonLogo from "../img/moonLogo.png";

const SunIcon = () => {
  return (
    <img
      src={data.icon == "sunLogo" ? sunLogo : moonLogo}
      style={{ width: "100px", height: "100px" }}
    />
  );
};

export default SunIcon;

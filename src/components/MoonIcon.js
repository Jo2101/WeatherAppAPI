import data from "../data/weather.json";
import moonLogo from "../img/moonLogo.png";
import sunLogo from "../img/sunLogo.png";

const MoonIcon = () => {
  return (
    <img
      src={data.icon == "moonLogo" ? moonLogo : sunLogo}
      style={{
        width: "6.25rem",
        height: "6.25rem",
      }}
    />
  );
};

export default MoonIcon;

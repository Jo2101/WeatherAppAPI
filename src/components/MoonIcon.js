import data from "../data/weather.json";
import moonLogo from "../img/moonLogo.png";
import sunLogo from "../img/sunLogo.png";

const MoonIcon = () => {
  return (
    <img
      src={data.icon == "moonLogo" ? moonLogo : sunLogo}
      style={{
        width: "100px",
        height: "100px",
      }}
    />
  );
};

export default MoonIcon;

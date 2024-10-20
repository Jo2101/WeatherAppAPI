import data from "../data/weather.json";
import moonLogo from "../img/moonLogo.png";

const MoonIcon = () => {
  return (
    <img
      src={data.icon == "moonLogo" ? moonLogo : ""}
      style={{
        width: "100px",
        height: "100px",
      }}
    />
  );
};

export default MoonIcon;

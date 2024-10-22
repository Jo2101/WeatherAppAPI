import { useState, useEffect } from "react";
//nije zavrseno
//STYLES

const Background = () => {
  const [backgroundSatelite, setBackgroundSatelite] = useState({});
  const apiKey = "D6VlGE0DGWpkcW7c3BGJLvFhV54APS81";

  useEffect(() => {
    const fetchBackgroundImage = () => {
      fetch(
        `http://dataservice.accuweather.com/imagery/v1/maps/radsat/{resolution}/${apiKey}`
      )
        .then((response) => response.json())
        .then((backgroundResponse) => {
          const imageUrl = URL.createObjectURL(backgroundResponse);
          setBackgroundSatelite(imageUrl);
        });
    };

    fetchBackgroundImage();
  }, []);
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundSatelite})` }}
    >
      {backgroundSatelite}
    </div>
  );
};

export default Background;

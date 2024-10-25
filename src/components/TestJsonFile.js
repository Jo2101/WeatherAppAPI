//STYLES
import "../styles/weatherCard.css";
import "../styles/weatherDetails.css";
import axios from "axios";

//STATES
import React, { useState, useEffect } from "react";

//COMPONENTS
import WeatherDetails from "./WeatherDetails";
import Date from "./Date";
import SearchButtonTest from "./SearchButtonTest";

//DATA
import data from "../data/location.json";

const WeatherCard = () => {
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");
  const [newLocation, setNewLocation] = useState("Frankfurt");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("../data/location.json").then((res) => {
      setWeather(res.data.weather);
    });
  }, []);
};

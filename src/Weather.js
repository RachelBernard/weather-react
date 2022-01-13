import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [iconCode, setIconCode] = useState(null);
  let [forecast, setForecast] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayTemp(response) {
    setForecast(true);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIconCode(response.data.weather[0].icon);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "a15655002ee776e90f4daadb873d9051";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayTemp);
  }

  if (forecast) {
    let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="search"
            placeholder="Enter a city..."
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
        <ul>
          <li>Temperature: {temperature} °F</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}m/hr</li>
          <li>
            <img src={icon} alt="icon"></img>
          </li>{" "}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="search"
            placeholder="Enter a city..."
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

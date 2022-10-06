import React from "react";
import { useState } from "react";
import Title from "./components/title";
import Form from "./components/form";
import './App.css'
import Weather from "./components/weather";
const API_Key = "c19c5c647b033a229f7be182dfc11336";

function App() {

  const [weatherInfo, setWeatherInfo] = useState ({
    city: undefined,
    temperature: undefined,

    country: undefined,
    humidity: undefined,
    error: undefined,
    description: undefined
})


  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
    );

    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      setWeatherInfo({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      setWeatherInfo({
        city: undefined,
        temperature: undefined,

        country: undefined,
        humidity: undefined,
        error: "Please enter the Values",
        description: undefined,
      });
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 title-container">
                <Title />
              </div>
              <div className="col-lg-7 form-container">
                <Form getWeather={getWeather} />
                <Weather
                  city={weatherInfo.city}
                  country={weatherInfo.country}
                  temperature={weatherInfo.temperature}
                  humidity={weatherInfo.humidity}
                  description={weatherInfo.description}
                  error={weatherInfo.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

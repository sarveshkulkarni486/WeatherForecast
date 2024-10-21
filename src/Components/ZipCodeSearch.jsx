import React, { useState } from 'react';
import axios from 'axios';
import sunny from '../assets/images/sunny.gif';
import cloudy from '../assets/images/cloudy.gif';
import mist from '../assets/images/mist.gif';
import thunder from '../assets/images/thunder.gif';
import './home.css';
function ZipCodeSearch() {
  const [postalCode, setPostalCode] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "2429dcc5576616ab187ca482351015ba";

  const getWeatherByPostalCode = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${postalCode},IN&appid=${apiKey}`);
      setWeather(response.data);
      setError(null);
    } catch(err) {
      setError("Postal code not found");
      setWeather(null);
    }
  };
  const getWeatherImage = (description) => {
    switch(description.toLowerCase()){
        case "clear sky":
            case "sunny":
                return sunny;
        case "clouds":
            case "overcast clouds":
                case "mostly cloudy":
                case "cloudy":
                    return cloudy;
        case "mist":
            case "hazy":
                case "haze":
                    case "foggy":
                        return mist;
        case "rain":
            return thunder;
        default:
            return "No Image found";
    }
};
  return (
    <div className="container text-center mt-5">
    <h1 className="mb-4">Weather App</h1>
    <input type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} />
    <button onClick={getWeatherByPostalCode}>Get Updates</button>

    {error && <p className="text-danger">{error}</p>}

    {weather && (
        <div className="card weather-card mx-auto" style={{width:'18rem;'}}>
            <img className="card-img-top" src={getWeatherImage(weather.weather[0].description)} alt="Card img cap" />
            <div className="card-body">
                <h2 className="card-title">{weather.name}</h2>
                <p className="card-text">Temprature: {weather.main.temp}</p>
                <p className="card-text">Weather: {weather.weather[0].description}</p>
                <p className="card-text">Humidity: {weather.main.humidity}%</p>
            </div>
        </div>
    )}
    </div>
  )
}

export default ZipCodeSearch
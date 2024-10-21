import React, { useState } from 'react';
import axios from 'axios';
import './home.css';
import sunny from '../assets/images/sunny.gif';
import cloudy from '../assets/images/cloudy.gif';
import mist from '../assets/images/mist.gif';
import thunder from '../assets/images/thunder.gif';
function LocationSearch() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey="2429dcc5576616ab187ca482351015ba";

  const getWeatherByLocation = async(lat, lon) => {
    try{
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      setWeather(response.data);
      setError(null);
    } catch(err) {
      setError("unable to fetch weather for your location");
      setWeather(null);
    }
  };

  const handleLocationRequest = () => {
    if(navigator.geolocation){
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position)=> {
        const {latitude, longitude} = position.coords;
        getWeatherByLocation(latitude, longitude);
        setLoading(false);
      }, (error) => {
        setError("Failed to get location. Please try enable location services");
        setLoading(false);
      });
    } else {
      setError("Geolocation is not supported by your browser");
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
                  case "broken clouds":
                    case "scattered clouds":
                      case "few clouds":
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

return(
    <div className="container text-center mt-5">
        <h1 className="mb-4">Weather App</h1>
        
        <button className='btn btn-secondary mb-4' onClick={handleLocationRequest} disabled={loading}>
          {loading ? "Fetching Location..." : "Get weather by location"}
        </button>

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

export default LocationSearch;
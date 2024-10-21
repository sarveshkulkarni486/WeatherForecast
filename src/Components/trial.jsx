import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; // Custom CSS for styling

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For showing loading state during GPS request

  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

  // Function to get weather by city name
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  // Function to get weather by GPS coordinates
  const getWeatherByLocation = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("Unable to fetch weather for your location");
      setWeather(null);
    }
  };

  // Function to request GPS location from user
  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      setLoading(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByLocation(latitude, longitude); // Fetch weather using GPS coordinates
          setLoading(false); // Stop loading
        },
        (error) => {
          setError("Failed to get location. Please enable location services.");
          setLoading(false); // Stop loading
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const getWeatherImage = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
      case "sunny":
        return "/sunny.png";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return "/cloudy.png";
      case "mist":
      case "haze":
        return "/mist.png";
      case "rain":
      case "light rain":
      case "moderate rain":
        return "/rain.png";
      case "snow":
      case "light snow":
        return "/snow.png";
      default:
        return "/default.png";
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Weather App</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter your City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-primary mb-4" onClick={getWeather}>
        Get Weather
      </button>

      {/* Button for fetching weather based on GPS */}
      <button className="btn btn-secondary mb-4" onClick={handleLocationRequest} disabled={loading}>
        {loading ? "Fetching Location..." : "Get Weather by Location"}
      </button>

      {error && <p className="text-danger">{error}</p>}

      {weather && (
        <div className="card weather-card mx-auto">
          <img
            src={getWeatherImage(weather.weather[0].description)}
            className="card-img-top"
            alt="Weather Condition"
          />
          <div className="card-body">
            <h2 className="card-title">{weather.name}</h2>
            <p className="card-text">Temperature: {weather.main.temp}°C</p>
            <p className="card-text">Weather: {weather.weather[0].description}</p>
            <p className="card-text">Humidity: {weather.main.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

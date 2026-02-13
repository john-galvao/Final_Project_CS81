import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherApi";
import "./styles/app.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (city) => {
    const data = await fetchWeather(city);
    setWeatherData(data);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <WeatherSearch onSearch={handleSearch} />

      <WeatherCard weather={weatherData} />
    </div>
  );
}

export default App;
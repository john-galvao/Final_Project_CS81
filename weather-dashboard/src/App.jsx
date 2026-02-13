import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
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

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weatherData.city}</h2>
          <p>{weatherData.temperature}°F</p>
          <p>{weatherData.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
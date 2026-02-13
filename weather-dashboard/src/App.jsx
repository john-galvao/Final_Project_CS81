import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherApi";
import "./styles/app.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <WeatherSearch onSearch={handleSearch} />

      {loading && <p style={{ marginTop: "16px" }}>Loading...</p>}

      {error && (
        <p style={{ marginTop: "16px", color: "crimson" }}>
          {error}
        </p>
      )}

      {!loading && !error && <WeatherCard weather={weatherData} />}
    </div>
  );
}

export default App;
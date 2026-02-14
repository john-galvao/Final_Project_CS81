import { useEffect, useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherApi";
import "./styles/app.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState(() => {
    const saved = localStorage.getItem("recentCities");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recent));
  }, [recent]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);

      setRecent((prev) => {
        const updated = [data.city, ...prev.filter((c) => c !== data.city)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem("recentCities");
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <WeatherSearch onSearch={handleSearch} />

      {recent.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Recent searches:</strong>
            </p>

            <button
              onClick={clearRecent}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "white",
              }}
            >
              Clear
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {recent.map((city) => (
              <button
                key={city}
                onClick={() => handleSearch(city)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p style={{ marginTop: "16px" }}>Loading...</p>}

      {error && (
        <p style={{ marginTop: "16px", color: "crimson" }}>{error}</p>
      )}

      {!loading && !error && <WeatherCard weather={weatherData} />}
    </div>
  );
}

export default App;
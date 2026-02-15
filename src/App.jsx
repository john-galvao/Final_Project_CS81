import { useEffect, useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherApi";
import "./styles/app.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState("F");
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

  const toggleUnits = () => {
    setUnits((prev) => (prev === "F" ? "C" : "F"));
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <button
        onClick={toggleUnits}
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          cursor: "pointer",
          backgroundColor: "white",
          marginTop: "8px",
        }}
      >
        Units: °{units} (click to switch)
      </button>

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
        <p style={{ marginTop: "16px", color: "crimson" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <WeatherCard weather={weatherData} units={units} />
      )}

      <footer
        style={{
          marginTop: "40px",
          fontSize: "14px",
          color: "#666",
        }}
      >
        Data provided by Open-Meteo
      </footer>
    </div>
  );
}

export default App;
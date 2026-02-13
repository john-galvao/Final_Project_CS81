import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import "./styles/app.css";

function App() {
  const [lastSearchedCity, setLastSearchedCity] = useState("");

  const handleSearch = (city) => {
    setLastSearchedCity(city);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <WeatherSearch onSearch={handleSearch} />

      {lastSearchedCity && (
        <p style={{ marginTop: "16px" }}>
          Last searched city: <strong>{lastSearchedCity}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
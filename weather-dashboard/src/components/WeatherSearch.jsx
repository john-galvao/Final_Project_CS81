import { useState } from "react";

function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city (e.g., Los Angeles)"
        style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default WeatherSearch;
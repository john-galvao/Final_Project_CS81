import { useState } from "react";

function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();

    if (!trimmed) {
      setMessage("Please enter a city name.");
      return;
    }

    setMessage("");
    onSearch(trimmed);
    setCity("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city (e.g., Los Angeles)"
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "white",
          }}
        >
          Search
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "10px", color: "crimson" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default WeatherSearch;
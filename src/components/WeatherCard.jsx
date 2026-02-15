function WeatherCard({ weather, units }) {
  if (!weather) return null;

  const formattedTime = new Date(weather.time).toLocaleString();

  const tempF = weather.temperature;
  const tempC = Math.round(((tempF - 32) * 5) / 9);
  const displayTemp = units === "F" ? tempF : tempC;

  const getIcon = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 99) return "⛈️";
    return "🌡️";
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "white",
        color: "#222",
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 0 10px 0" }}>{weather.city}</h2>

      <div style={{ fontSize: "40px", marginBottom: "6px" }}>
        {getIcon(weather.code)}
      </div>

      <p style={{ fontSize: "24px", margin: "0 0 8px 0" }}>
        {displayTemp}°{units}
      </p>

      <p style={{ margin: "0 0 8px 0" }}>{weather.condition}</p>

      <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
        Updated: {formattedTime}
      </p>
    </div>
  );
}

export default WeatherCard;
function WeatherCard({ weather }) {
  if (!weather) return null;

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
      }}
    >
      <h2>{weather.city}</h2>
      <p style={{ fontSize: "22px", margin: "8px 0" }}>
        {weather.temperature}°F
      </p>
      <p>{weather.condition}</p>
    </div>
  );
}

export default WeatherCard;
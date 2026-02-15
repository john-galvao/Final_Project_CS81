export async function fetchWeather(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found.");
  }

  const { latitude, longitude, name } = geoData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const current = weatherData.current_weather;

  const tempF = Math.round((current.temperature * 9) / 5 + 32);
  const windMph = Math.round(current.windspeed * 0.621371);

  return {
    city: name,
    temperature: tempF,
    condition: `Wind ${windMph} mph`,
    time: current.time,
  };
}
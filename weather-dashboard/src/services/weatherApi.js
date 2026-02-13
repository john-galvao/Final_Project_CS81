export async function fetchWeather(city) {
  console.log("Fetching weather for:", city);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city,
        temperature: 72,
        condition: "Sunny",
      });
    }, 800);
  });
}
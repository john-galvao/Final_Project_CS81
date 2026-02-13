export async function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city.toLowerCase() === "asdf") {
        reject(new Error("City not found. Try another search."));
        return;
      }

      resolve({
        city,
        temperature: 72,
        condition: "Sunny",
      });
    }, 800);
  });
}
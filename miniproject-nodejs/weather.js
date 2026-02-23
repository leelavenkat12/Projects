import readline from "readline/promises";

const API_KEY = "99bac048da6883da6a9366e16a94899f";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
}); 

const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url); // get me the data of the url what it there we use aiat bocz to get all the data 

    if (!response.ok) {
      throw new Error("City not found, please check the name");
    }

    const weatherData = await response.json(); // it converts the data string to js object to radify
    console.log(weatherData);
    

    console.log("\n🌤 Weather Information:");
    console.log(`City: ${weatherData.name}`);
    console.log(`Temperature: ${weatherData.main.temp} °C`);
    console.log(`Description: ${weatherData.weather[0].description}`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const city = await r1.question("Enter city name: ");
await getWeather(city);
r1.close();
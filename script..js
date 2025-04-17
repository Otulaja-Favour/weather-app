async function getWeather(city) {
  const API_KEY = "1862a4c96c034e74f156c00ddb278294";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    console.log(data);
    
document.getElementById('state').innerText = city
document.getElementById('temperature').innerText =  data.main.temp, "°C"
document.getElementById('situation').innerText = data.weather[0].description
document.getElementById('humidity').innerText = data.main.humidity, "%"
// document.getElementById('')
// document.getElementById('')



    console.log(`Weather in ${city}:`);
    console.log("Temperature:", data.main.temp, "°C");
    console.log("Description:", data.weather[0].description);
    // console.log("Description:", data.weather[1].description);

    console.log("Humidity:", data.main.humidity, "%");

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
getWeather('london')

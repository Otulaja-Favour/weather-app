async function getWeather(city) {
    const API_KEY = "1862a4c96c034e74f156c00ddb278294";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
  
     
      const data = await response.json();
  
      document.getElementById('state').innerText = `City: ${city}`;
      document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
      document.getElementById('situation').innerText = `Weather: ${data.weather[0].description}`;
      document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  
  document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
      getWeather(city);
    }
  });
  
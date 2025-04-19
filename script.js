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
  document.getElementById('city').addEventListener('input', () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
      getWeather(city);
    }
  });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById('current').innerHTML = `
         Latitude: ${position.coords.latitude} <br>
         Longitude: ${position.coords.longitude} <br>
         Accuracy: ${position.coords.accuracy}meters
          `
          console.log("Current Location:");
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          console.log("Accuracy:", position.coords.accuracy, "meters");
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  // Usage
  getLocation();
  
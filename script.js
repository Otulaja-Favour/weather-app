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

async function getWeatherByCoordinates(lat, lon) {
  const API_KEY = "1862a4c96c034e74f156c00ddb278294";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    const city = data.name || "Current Location";
    document.getElementById('state').innerText = `City: ${city}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('situation').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;

    // Log weather data
    console.log("Weather Data for Current Location:", data);
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
  }
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  if (city) {
    getWeather(city);
    document.getElementById('city').value = ''; // Corrected from innerHTML
    document.getElementById('current').innerHTML = '';
  }
});

// Autocomplete city filter
async function filterCities(query) {
  document.getElementById('current').innerHTML = ''; // Clear previous suggestions
  if (!query)  return;

  try {
    // Use OpenWeatherMap's geocoding API for city suggestions
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=1862a4c96c034e74f156c00ddb278294`
    );
    const cities = await response.json();
    if (cities.length > 0) {
      cities.forEach(city => {
        const suggestion = document.createElement('div');
          suggestion.textContent = `${city.name}, ${city.country}${city.state ? `, ${city.state}` : ''}`
        suggestion.style.cursor = 'pointer';
        suggestion.style.backgroundColor = 'white';
        suggestion.style.color = 'black';
        suggestion.style.padding = '5px';
        suggestion.addEventListener('click', () => {
          document.getElementById('city').value = `
          ${city.name}, ${city.country}${city.state}  ${city.state}
          `;
          document.getElementById('current').innerHTML = '';
          getWeather(city.name); 
          document.getElementById('city').innerHTML = ''
        });
        document.getElementById('current').appendChild(suggestion);
      });
    }
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
  }
}

document.getElementById('city').addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query) {
    filterCities(query); 
    document.getElementById('current').style.display = 'block'; 

  } else {
    document.getElementById('current').innerHTML = ''; 
  }
});

// Get current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
      

        // Fetch weather for current location
        getWeatherByCoordinates(lat, lon);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Initialize
getLocation();



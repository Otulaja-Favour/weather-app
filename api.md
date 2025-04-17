# JavaScript API Development Guide

## Table of Contents

1. [Introduction to APIs](#introduction-to-apis)
2. [Browser APIs](#browser-apis)
3. [Fetch API](#fetch-api)
4. [LocalStorage API](#localstorage-api)
5. [Geolocation API](#geolocation-api)
6. [Third-Party APIs](#third-party-apis)
7. [Tasks and Assignments](#tasks-and-assignments)

## Introduction to APIs

### What is an API?

An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange information.

An API (Application Programming Interface) is like a waiter in a restaurant. It takes your order (request) to the kitchen (server) and brings back your food (response). In web development, APIs allow different applications to talk to each other.

### Why Use APIs?

- Get data from other services (like weather, news, etc.)
- Save time by using existing services
- Build powerful applications by combining different services

## Browser APIs

Browser APIs are built-in features of web browsers that allow JavaScript to interact with the browser and the computer's hardware. They provide functionality like:

- Making network requests
- Storing data locally
- Accessing device features
- Manipulating the browser

### Common Browser APIs

1. Fetch API - For making HTTP requests
2. LocalStorage API - For storing data locally
3. Geolocation API - For accessing location data
4. Web Storage API - For storing data
5. History API - For manipulating browser history
6. Canvas API - For drawing graphics

## Fetch API

The Fetch API provides a way to make HTTP requests to servers from web browsers. It's the modern way to handle network requests in JavaScript.

### Basic Structure

```javascript
fetch("URL", {
  method: "GET", // or POST, PUT, DELETE
  headers: {
    "Content-Type": "application/json",
    // other headers
  },
  body: JSON.stringify(data), // for POST and PUT
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### CRUD Operations Examples

#### 1. GET - Fetch All Users

```javascript
async function getAllUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    console.log("All users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Usage
getAllUsers();
```

#### 2. GET - Fetch Single User

```javascript
async function getUserById(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const user = await response.json();
    console.log(`User ${id}:`, user);
    return user;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
  }
}

// Usage
getUserById(1);
```

#### 3. POST - Create New User

```javascript
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const newUser = await response.json();
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Usage
createUser({
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
});
```

#### 4. PUT - Update User (Complete Update)

```javascript
async function updateUser(id, userData) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const updatedUser = await response.json();
    console.log(`User ${id} updated:`, updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
  }
}

// Usage
updateUser(1, {
  name: "Updated Name",
  email: "updated@example.com",
  phone: "987-654-3210",
});
```

#### 5. PATCH - Partial Update

```javascript
async function partialUpdateUser(id, updates) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );
    const updatedUser = await response.json();
    console.log(`User ${id} partially updated:`, updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(`Error partially updating user ${id}:`, error);
  }
}

// Usage
partialUpdateUser(1, {
  email: "newemail@example.com",
});
```

#### 6. DELETE - Remove User

```javascript
async function deleteUser(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(`User ${id} deleted successfully`);
    return response.ok;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
  }
}

// Usage
deleteUser(1);
```






## LocalStorage API

The LocalStorage API allows you to store data in the browser that persists even after the browser is closed. It's perfect for saving user preferences or small amounts of data.

### Basic Methods

- `localStorage.setItem(key, value)` - Save data
- `localStorage.getItem(key)` - Get data
- `localStorage.removeItem(key)` - Remove data
- `localStorage.clear()` - Clear all data

### Example 1: Saving User Preferences

```javascript
// Save user theme preference
function saveThemePreference(theme) {
  localStorage.setItem("userTheme", theme);
  console.log("Theme saved:", theme);
}

// Load saved theme
function loadThemePreference() {
  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) {
    console.log("Loaded theme:", savedTheme);
  } else {
    console.log("No saved theme found");
  }
}

// Usage
saveThemePreference("dark-mode");
loadThemePreference();
```

### Example 2: Todo List with LocalStorage

```javascript
// Save todos
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("Todos saved:", todos);
}

// Get todos
function getTodos() {
  const todos = localStorage.getItem("todos");
  const parsedTodos = todos ? JSON.parse(todos) : [];
  console.log("Current todos:", parsedTodos);
  return parsedTodos;
}

// Usage
const todos = getTodos();
todos.push({ id: 1, text: "Learn APIs", completed: false });
saveTodos(todos);
```

## Geolocation API

The Geolocation API allows you to get the user's current position. It's useful for location-based services and features.

### Basic Methods

- `navigator.geolocation.getCurrentPosition()` - Get current position
- `navigator.geolocation.watchPosition()` - Watch position changes
- `navigator.geolocation.clearWatch()` - Stop watching position

### Example 1: Get Current Location

```javascript
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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
```

### Example 2: Watch Position (Continuous Updates)

```javascript
function watchLocation() {
  if (navigator.geolocation) {
    console.log("Starting location tracking...");
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("New position update:");
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
        console.error("Error watching location:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Stop watching after 1 minute
    setTimeout(() => {
      navigator.geolocation.clearWatch(watchId);
      console.log("Location tracking stopped");
    }, 60000);
  }
}

// Usage
watchLocation();
```

## Third-Party APIs

Third-Party APIs are services provided by external companies that you can integrate into your application. They often require API keys and have specific usage limits.

### Example 1: OpenWeatherMap API

```javascript
async function getWeather(city) {
  const API_KEY = "YOUR_API_KEY";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    console.log(`Weather in ${city}:`);
    console.log("Temperature:", data.main.temp, "°C");
    console.log("Description:", data.weather[0].description);
    console.log("Humidity:", data.main.humidity, "%");

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

// Usage
getWeather("London");
```

### Example 2: Google Maps API (Console Version)

```javascript
// Note: This is a simplified version that just logs coordinates
function initMap() {
  // Simulated map coordinates
  const center = { lat: -34.397, lng: 150.644 };
  const marker = { lat: -34.397, lng: 150.644 };

  console.log("Map initialized at:");
  console.log("Center:", center);
  console.log("Marker position:", marker);
}

// Usage
initMap();
```



## Tips for Success

1. **Always Handle Errors**

   ```javascript
   try {
     // Your API call here
   } catch (error) {
     console.error("Error:", error);
     // Show error message to user
   }
   ```

2. **Use Async/Await**

   ```javascript
   async function getData() {
     try {
       const response = await fetch("URL");
       const data = await response.json();
       // Use the data
     } catch (error) {
       console.error("Error:", error);
     }
   }
   ```

3. **Start Simple**
   - Begin with GET requests
   - Move to POST requests
   - Add error handling
   - Improve the UI

## Next Steps

1. Practice with different APIs
2. Learn about API authentication
3. Explore more complex API features
4. Build your own API projects

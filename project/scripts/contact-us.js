const currentyear = document.querySelector("#currentyear");

const today = new Date();

currentyear.textContent = today.getFullYear();

let oLastModif = new Date(document.lastModified);

const lastModified = document.querySelector("#lastModified");

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show-navigation');
    });
});

const apiKey = '63fd71280537dece5bc28ee2eb59fcc0';
    const city = 'São Paulo';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
            document.getElementById('weather-description').textContent = data.weather[0].description;
        })
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = document.getElementById('forecast');
            forecast.innerHTML = ''; // Clear previous forecast data
            
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date().getDay();

            for (let i = 0; i < 7; i++) {
                const forecastDayIndex = (today + i) % 7;
                const forecastData = data.list[i * 8]; // Forecast data for every 24 hours
                
                const forecastDay = document.createElement('div');
                forecastDay.textContent = `Day ${i + 1}: ${daysOfWeek[forecastDayIndex]} - ${forecastData.main.temp}°C, ${forecastData.weather[0].description}`;
                forecast.appendChild(forecastDay);
            }
        })
        .catch(error => console.error('Error fetching weather forecast:', error));

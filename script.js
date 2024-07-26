document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });



const searchButton = document.querySelector('#button-addon2');
const inputKeyword = document.querySelector('.input-keyword');
const cityDropdown = document.querySelector('#city-dropdown');
const result = document.querySelector('.result');
document.body.style.backgroundImage = 'url(img/sky.jpg)';

const apiKey = '1fe5f03e8b679377cbc41601289edfdd';
const baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

searchButton.addEventListener('click', function() {
    const city = inputKeyword.value || cityDropdown.value;
    if (city) {
        fetchWeatherData(city);
    }
    inputKeyword.value = '';
    cityDropdown.value = '';
});

cityDropdown.addEventListener('change', function() {
    if (cityDropdown.value) {
        fetchWeatherData(cityDropdown.value);
        inputKeyword.value = '';
    }
});

function fetchWeatherData(city) {
    result.innerHTML = '<p class="loading">Loading...</p>';
    
    fetch(`${baseApiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            result.innerHTML = '<p class="error">Error fetching weather data. Please try again.</p>';
        });
}

function displayWeatherData(data) {
    result.innerHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div class="weather-info">
                <div class="weather-main">
                    <span class="temp">${data.main.temp}°C</span>
                    <span class="description">${data.weather[0].description}</span>
                </div>
                <div class="weather-details">
                    <p>Temperature from ${data.main.temp_min}°C to ${data.main.temp_max}°C</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Clouds: ${data.clouds.all}%</p>
                    <p>Geo Coordinates: [${data.coord.lat}, ${data.coord.lon}]</p>
                </div>
            </div>
        </div>
    `;
}}
);

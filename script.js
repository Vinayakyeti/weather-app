// API key from environment variable
const API_KEY = '84254d5ce02335eb1d0ed7c9393e2ebb';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message === 'City not found' ? 'City not found. Please try again.' : 'Something went wrong. Please try again.');
    }
}

function displayWeather(data) {
    weatherDisplay.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}

function showError(message) {
    weatherDisplay.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}

async function loadDefaultCity() {
    cityInput.value = 'Delhi';
    await getWeather();
}

loadDefaultCity();

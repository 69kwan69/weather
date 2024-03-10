import * as Controller from './js/controller.js';
import './style/reset.css';
import './style/style.scss';

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.fa-magnifying-glass');
const errorMsg = document.querySelector('.error-message');
const switchForecast = document.querySelector('.switch-forecast');
const preferencesMenu = document.querySelector('.preferences');
const preferenceOptions = preferencesMenu.querySelectorAll('.option');

// Listen to onload
let coords = '';
try {
  const location = await getLocation();
  coords = `${location.coords.latitude},${location.coords.longitude}`;
} catch {
  console.log('Unable to get location');
  console.log(
    'Wait for The Weather App fetching weather information from somewhere...'
  );
}
Controller.displayWeather(coords);

// Listen to searchbar submission
searchInput.addEventListener('keydown', (e) => {
  errorMsg.classList.add('hidden');

  if (e.key !== 'Enter') return;

  const forecastMode = switchForecast.dataset.forecastMode;
  const city = e.currentTarget.value;
  Controller.displayWeather(city, forecastMode);
});

searchIcon.addEventListener('click', () => {
  const forecastMode = switchForecast.dataset.forecastMode;
  const city = searchInput.value;
  Controller.displayWeather(city, forecastMode);
});

// Listen to toggle switch
switchForecast.addEventListener('click', (e) => {
  const forecastMode = e.currentTarget.dataset.forecastMode;
  Controller.switchForecast(forecastMode);
});

preferenceOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const name = option.dataset.name;
    const value = option.dataset.value;
    const forecastMode = switchForecast.dataset.forecastMode;
    Controller.switchPreferences(name, value, forecastMode);
  });
});

// Geolocation function
async function getLocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

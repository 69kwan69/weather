import * as View from './displayFunctions.js';
import * as Model from './apiFunctions.js';

const PREF_UNITS = getPreferences() || ['f', 'mph'];
let defaultForecastMode = 'hourly';
let defaultPlace = 'Saigon';
let weatherInformation;

async function getWeatherInformation(city) {
  weatherInformation = await Model.getWeatherInformation(city);
}

async function displayWeather(city, forecastMode) {
  try {
    if (!city) city = defaultPlace;
    if (!forecastMode) forecastMode = defaultForecastMode;

    View.showLoadingScreen();
    await getWeatherInformation(city);
    View.hideSearchError();

    View.displayLocation(weatherInformation.location);
    View.displayPreferences(PREF_UNITS);

    View.displayCurrentWeather(weatherInformation.current, PREF_UNITS);
    View.displayAdditionalWeather(weatherInformation.current, PREF_UNITS);

    if (forecastMode === 'hourly')
      View.displayHourlyForecast(weatherInformation.hourlyForecast, PREF_UNITS);
    else if (forecastMode === 'daily')
      View.displayDailyForecast(weatherInformation.dailyForecast, PREF_UNITS);
    View.switchForecast(forecastMode);
  } catch {
    View.showSearchError('Location not found');
  }

  View.hideLoadingScreen();
  View.resetSearchbar();
}

function switchForecast(previousMode) {
  const mode = previousMode === 'daily' ? 'hourly' : 'daily';

  if (mode === 'hourly')
    View.displayHourlyForecast(weatherInformation.hourlyForecast, PREF_UNITS);
  else if (mode === 'daily')
    View.displayDailyForecast(weatherInformation.dailyForecast, PREF_UNITS);

  View.switchForecast(mode);
}

function switchPreferences(option, previousValue, forecastMode) {
  // Handle data
  switch (option) {
    case 'temp':
      PREF_UNITS[0] = previousValue === 'c' ? 'f' : 'c';

      break;
    case 'vel':
      PREF_UNITS[1] = previousValue === 'kph' ? 'mph' : 'kph';
      break;
  }

  // Change UI (let View do the thing)
  View.displayPreferences(PREF_UNITS);
  View.displayCurrentWeather(weatherInformation.current, PREF_UNITS);
  View.displayAdditionalWeather(weatherInformation.current, PREF_UNITS);

  if (forecastMode === 'hourly')
    View.displayHourlyForecast(weatherInformation.hourlyForecast, PREF_UNITS);
  else if (forecastMode === 'daily')
    View.displayDailyForecast(weatherInformation.dailyForecast, PREF_UNITS);

  // Save to Local Storage
  savePreferences();
}

function savePreferences() {
  localStorage.setItem('prefUnits', JSON.stringify(PREF_UNITS));
}

function getPreferences() {
  const prefUnits = JSON.parse(localStorage.getItem('prefUnits'));
  return prefUnits;
}

export {
  getWeatherInformation,
  displayWeather,
  switchForecast,
  switchPreferences,
  savePreferences,
  getPreferences,
};

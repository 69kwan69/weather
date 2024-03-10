const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function createForecastItem(temp, time, icon) {
  return `
    <li class="forecast">
      <p class="forecast__temp">${temp}</p>
      <p class="forecast__time">${time}</p>
      <img class="forecast__icon" src="${icon}" />
    </li>
  `;
}

function displayLocation(location) {
  const locationEl = document.querySelector('.location');

  const locationName = locationEl.querySelector('.location__name');
  locationName.textContent = location.name;

  const locationCountry = locationEl.querySelector('.location__country');
  locationCountry.textContent = ', ' + location.country;

  const locationLocaltime = locationEl.querySelector('.location__localtime');
  const dateObj = new Date(location.localtime);
  locationLocaltime.textContent = `${
    days[dateObj.getDay()]
  }, ${dateObj.getDate()} ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;
}

function displayCurrentWeather(current, preferedUnits) {
  const currentEl = document.querySelector('.current');

  const currentIcon = currentEl.querySelector('.current__icon');
  currentIcon.src = current.icon;

  const currentTemp = currentEl.querySelector('.current__temp');
  if (preferedUnits[0] === 'f')
    currentTemp.textContent = `${current.temp_f} °F`;
  else if (preferedUnits[0] === 'c')
    currentTemp.textContent = `${current.temp_c} °C`;

  const currentText = currentEl.querySelector('.current__text');
  currentText.textContent = current.text;
}

function displayAdditionalWeather(current, preferedUnits) {
  const currentHumidity = document.querySelector('.additional__data.humidity');
  currentHumidity.textContent = `${current.humidity}%`;

  const currentUV = document.querySelector('.additional__data.uv');
  currentUV.textContent = current.uv;

  const currentWindSpeed = document.querySelector(
    '.additional__data.wind-speed'
  );
  if (preferedUnits[1] === 'kph')
    currentWindSpeed.textContent = `${current.wind_kph} km/h`;
  else if (preferedUnits[1] === 'mph')
    currentWindSpeed.textContent = `${current.wind_mph} mph`;
}

function displayDailyForecast(forecast, preferedUnits) {
  const forecastList = document.querySelector('.forecast-list');
  forecastList.innerHTML = '';
  forecast.forEach((day) => {
    const temp =
      preferedUnits[0] === 'c' ? `${day.temp_c} °C` : `${day.temp_f} °F`;
    const time = days[new Date(day.date).getDay()];
    const icon = day.icon;

    const htmlLi = createForecastItem(temp, time, icon);
    forecastList.innerHTML += htmlLi;
  });
}

function displayHourlyForecast(forecast, preferedUnits) {
  const forecastList = document.querySelector('.forecast-list');
  forecastList.innerHTML = '';
  forecast.forEach((hour) => {
    const temp =
      preferedUnits[0] === 'c' ? `${hour.temp_c} °C` : `${hour.temp_f} °F`;
    const time = hour.hour + ':00';
    const icon = hour.icon;

    const htmlLi = createForecastItem(temp, time, icon);
    forecastList.innerHTML += htmlLi;
  });
}

function resetSearchbar() {
  const searchInput = document.querySelector('.search-input');
  searchInput.value = '';
}

function switchForecast(mode) {
  const switchForecast = document.querySelector('.switch-forecast');
  const switchIndicator = switchForecast.querySelector('.indicator');

  if (mode === 'hourly') {
    switchForecast.dataset.forecastMode = 'hourly';
    switchIndicator.style.translate = '100% -50%';
  } else if (mode === 'daily') {
    switchForecast.dataset.forecastMode = 'daily';
    switchIndicator.style.translate = '0% -50%';
  }
}

function displayPreferences(preferedUnits) {
  const preferences = document.querySelector('.preferences');
  const options = preferences.querySelectorAll('.option');
  const settingsMap = {
    c: 'C',
    f: 'F',
    kph: 'Km/h',
    mph: 'Mph',
  };

  for (let i = 0; i < preferedUnits.length; i++) {
    options[i].dataset.value = preferedUnits[i];
    options[i].querySelector('.unit').textContent =
      settingsMap[preferedUnits[i]];
  }
}

function showLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.classList.add('active');
}

function hideLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.classList.remove('active');
}

function showSearchError(error) {
  const errorMsg = document.querySelector('.error-message');
  errorMsg.textContent = error;
  errorMsg.classList.remove('hidden');
}

function hideSearchError() {
  const errorMsg = document.querySelector('.error-message');
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

export {
  displayCurrentWeather,
  displayLocation,
  displayAdditionalWeather,
  displayDailyForecast,
  displayHourlyForecast,
  resetSearchbar,
  switchForecast,
  displayPreferences,
  showLoadingScreen,
  hideLoadingScreen,
  showSearchError,
  hideSearchError,
};

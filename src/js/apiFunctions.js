const API_KEY = '5746854e984c4eaaa0544917231409';
const API_URL = 'https://api.weatherapi.com/v1';
const API_METHOD = 'forecast.json';

async function getWeatherInformation(place, days = '5') {
  // try {
  const url = `${API_URL}/${API_METHOD}?key=${API_KEY}&q=${place}&days=${days}`;
  const res = await fetch(url);
  const data = await res.json();

  // Weather location
  const { location } = data;

  // Weather current
  const dataCurrent = data.current;
  const current = {
    temp_c: dataCurrent.temp_c,
    temp_f: dataCurrent.temp_f,
    text: dataCurrent.condition.text,
    icon: dataCurrent.condition.icon,
    humidity: dataCurrent.humidity,
    uv: dataCurrent.uv,
    wind_kph: dataCurrent.wind_kph,
    wind_mph: dataCurrent.wind_mph,
  };

  // Weather forecast
  const dataForecast = data.forecast.forecastday;
  // Weather daily forecast
  const dailyForecast = [];
  dataForecast.forEach((day) => {
    const data = {
      date: day.date,
      icon: day.day.condition.icon,
      temp_c: day.day.avgtemp_c,
      temp_f: day.day.avgtemp_f,
    };
    dailyForecast.push(data);
  });

  // Weather hourly forecast
  const hourlyForecast = [];
  for (let i = 1; i <= 24; i++) {
    const currentHour = parseInt(new Date(location.localtime).getHours());
    let hour = currentHour + i;
    let isNextDay = false;
    if (hour > 23) {
      hour -= 24;
      isNextDay = true;
    }

    const hourlyInfo = dataForecast[isNextDay ? 1 : 0].hour[hour];

    const data = {
      hour: new Date(hourlyInfo.time).getHours(),
      is_day: hourlyInfo.is_day,
      icon: hourlyInfo.condition.icon,
      temp_c: hourlyInfo.temp_c,
      temp_f: hourlyInfo.temp_f,
    };

    hourlyForecast.push(data);
  }

  const weatherInformation = {
    location,
    current,
    dailyForecast,
    hourlyForecast,
  };
  return weatherInformation;
  // } catch (e) {
  //   return e;
  // }
}

export { getWeatherInformation };

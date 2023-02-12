const temp = document.getElementById('temp'),
  date = document.getElementById('date-time'),
  currentLocation = document.getElementById('location'),
  Condition = document.getElementById('Condition'),
  rain = document.getElementById('rain'),
  mainIcon = document.getElementById('icon'),
  windspeed = document.querySelector('uv-index'),
  sunrise = document.querySelector('uv-index'),
  sunset = document.querySelector('uv-index'),
  visibility = document.querySelector('uv-index'),
  humidity = document.querySelector('uv-index'),
  visibilityStatus = document.querySelector('uv-index'),
  humidityStatus = document.querySelector('uv-index'),
  airQuality = document.querySelector('uv-index'),
  airQualityStatus = document.querySelector('uv-index');

let currentCity = '';
let currentUnit = 'C';
let hourlyOrWeek = 'week';

// UPDATE DATE AND TIME
function getDateTime() {
  let now = new Date(),
    hour = now.getHours(),
    minutes = now.getMinutes();

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  hour = hour % 12;
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  let dayString = days[now.getDay()];

  return `${dayString}, ${hour}:${minutes}`;
}

date.innerText = getDateTime();

//UPDATE TIME EVERY SECOND
setInterval(() => {
  date.innerText = getDateTime();
}, 2000);

//FUNCTION TO GET PUBLIC IP WITH FETCH
function getPublicIp() {
  fetch('https://geolocation-db.com/json/', {
    method: 'GET',
  })
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.currentCity;
      getWeatherData(data.city, currentUnit, hourlyOrWeek);
    });
}

getPublicIp();

//FUNCTION TO GET WEATHER DATA
function getWeatherData(city, unit, hourlyOrWeek) {
  const apiKey = '5UHP4E7FDWN52WGCVJ8N6KMFY';
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=5UHP4E7FDWN52WGCVJ8N6KMFY&contentType=json`,
    {
      method: 'GET',
    }
  )
    .then((Response) => Response.json())
    .then((data) => {
      let today = data.currentConditions;
      if (unit === 'C') {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celciusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      Condition.innerText = today.conditions;
      rain.innerText = 'perc -' + today.precipitation + '%';
    });
}

//COVERT CELCIUS TO FAHRENHEIT
function celciusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}

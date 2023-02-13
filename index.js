const temp = document.getElementById('temp'),
  date = document.getElementById('date-time'),
  currentLocation = document.getElementById('location'),
  Conditions = document.getElementsByClassName('.Condition'),
  rain = document.getElementById('rain'),
  uvIndex = document.querySelector('.uv-index'),
  uvText = document.querySelector('.uv-text'),
  mainIcon = document.getElementById('.icon'),
  windSpeed = document.querySelector('.wind-speed'),
  sunrise = document.querySelector('.sunrise'),
  sunset = document.querySelector('.sunset'),
  visibility = document.querySelector('.visibility'),
  humidity = document.querySelector('.humidity'),
  visibilityStatus = document.querySelector('.visibility-status'),
  humidityStatus = document.querySelector('.humidity-status'),
  airQuality = document.querySelector('.air-quality'),
  airQualityStatus = document.querySelector('.air-quality-status');

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
}, 1000);

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
      Conditions.innerText = today.condition;
      console.log(Conditions);
      rain.innerText = 'perc -' + today.precip + ' ' + '%';
      uvIndex.innerText = today.uvindex;
      windSpeed.innerText = today.windspeed;
      humidity.innerText = today.humidity + ' ' + '%';
      visibility.innerText = today.visibility;
      airQuality.innerText = today.winddir;
      measureUvIndex(today.uvindex);
      updateHumidityStatus(today.humidity);
      updateVisibilityStatus(today.visibility);
      updateAirQuality(today.winddir);
    });
}

//COVERT CELCIUS TO FAHRENHEIT
function celciusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}

//FUNCTION TO MEASURE UV INDEX STATUS
function measureUvIndex() {
  if (uvIndex >= 2) {
    uvText.innerText = 'Low';
  } else if (uvIndex >= 5) {
    uvText.innerText = 'Moderate';
  } else if (uvIndex >= 7) {
    uvText.innerText = 'High';
  } else if (uvIndex >= 10) {
    uvText.innerText = 'Very High';
  } else {
    uvText.innerText = 'Extreme';
  }
}

//UPDATE HUMIDITY STATUS
function updateHumidityStatus() {
  if (humidity >= 30) {
    humidityStatus.innerText = 'Low';
  } else if (humidity >= 60) {
    humidityStatus.innerText = 'Moderate';
  } else {
    humidityStatus.innerText = 'high';
  }
}

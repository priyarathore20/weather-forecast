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
  airQualityStatus = document.querySelector('.air-quality-status'),
  weatherCards = document.querySelector('.weather-cards');

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
      sunrise.innerText = convertTimeTo12HourFormat(today.sunrise);
      sunset.innerText = convertTimeTo12HourFormat(today.sunset);
      mainIcon.src = getIcon(today.icon);
      if (hourlyOrWeek === 'hourly') {
        updateForecast(data.days[0].hour, unit, 'day');
      } else {
        updateForecast(data.days, unit, 'week');
      }
    });
}

//COVERT CELCIUS TO FAHRENHEIT
function celciusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(1);
}

//FUNCTION TO MEASURE UV INDEX STATUS
function measureUvIndex(uvIndex) {
  if (uvIndex <= 2) {
    uvText.innerText = 'Low';
    crossOriginIsolated.log(uvText);
  } else if (uvIndex <= 5) {
    uvText.innerText = 'Moderate';
  } else if (uvIndex <= 7) {
    uvText.innerText = 'High';
  } else if (uvIndex <= 10) {
    uvText.innerText = 'Very High';
  } else {
    uvText.innerText = 'Extreme';
  }
}

//UPDATE HUMIDITY STATUS
function updateHumidityStatus(humidity) {
  if (humidity <= 30) {
    humidityStatus.innerText = 'Low';
  } else if (humidity <= 60) {
    humidityStatus.innerText = 'Moderate';
  } else {
    humidityStatus.innerText = 'high';
  }
}

//UPDATE VISIBILITY STATUS
function updateVisibilityStatus(visibility) {
  if (visibility <= 0.3) {
    visibilityStatus.innerText = 'Dense Fog';
  } else if (visibility <= 0.16) {
    visibilityStatus.innerText = 'Moderate Fog';
  } else if (visibility <= 0.35) {
    visibilityStatus.innerText = 'Light Fog';
  } else if (visibility <= 1.13) {
    visibilityStatus.innerText = 'Very Light Fog';
  } else if (visibility <= 2.16) {
    visibilityStatus.innerText = 'Light Mist';
  } else if (visibility <= 5.4) {
    visibilityStatus.innerText = 'Very List Mist';
  } else if (visibility <= 10.8) {
    visibilityStatus.innerText = 'Clear Air';
  } else {
    visibilityStatus.innerText = 'Very Clean Air';
  }
}

//UPDATE AIR QUALITY STATUS
function updateAirQuality(airQuality) {
  if (airQuality <= 50) {
    airQualityStatus.innerText = 'Good';
  } else if (airQuality <= 100) {
    airQualityStatus.innerText = 'Moderate';
  } else if (airQuality <= 150) {
    airQualityStatus.innerText = 'Unhealthy For Sensitive Groups';
  } else if (airQuality <= 200) {
    airQualityStatus.innerText = 'Unhealthy';
  } else if (airQuality <= 250) {
    airQualityStatus.innerText = 'Hazardous';
  }
}

//UPDATE SUNSET SUNRISE TIME
function convertTimeTo12HourFormat(time) {
  hour = time.split(':')[0];
  minutes = time.split(':')[1];
  let ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour & 12;
  console.log(hour);
  hour = hour ? hour : 12;
  console.log(hour);
  hour = hour < 10 ? '0' + hour : hour;
  console.log(hour);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  console.log(minutes);
  let strTime = hour + ':' + minutes + ':' + ampm;
  return strTime;
}

//MAIN ICON CHANGE
function getIcon(Conditions) {
  if (Conditions === 'partly-cloudy-day') {
    return '<img src="images/cloudy-sun.png">';
  } else if (Conditions === 'partly-cloudy-night') {
    return '<img src="images/cloudy-night.png">';
  } else if (Conditions === 'prainy') {
    return '<img src="images/rain.png">';
  } else if (Conditions === 'clear-night') {
    return '<img src="images/clear-night.png">';
  } else if (Conditions === 'clear-day') {
    return '<img src="images/sun.png">';
  } else {
    return '<img src="images/clouds.png">';
  }
}

function updateForecast(data, unit, type) {
  weatherCards.innerHTML = '';
  let numCards = 0,
    day = 0;
  if (type === 'day') {
    numCards = 24;
  } else {
    numCards = 7;
  }
  for (let i = 0; index < numCards; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    let dayName = getDayName(data[day].dateTime);
    if (type === 'week') {
      dayName = '';
    }
    let dayTemp = data[day].temp;
    if (unit === 'f') {
      dayTemp = celciusToFahrenheit(data[day].temp);
    }
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = '°C';
    if (unit === 'f') {
      tempUnit = '°F';
    }
  }
}

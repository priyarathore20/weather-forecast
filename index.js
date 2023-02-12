const temp = document.getElementById('temp');
date = document.getElementById('date-time');

let currentCity = '';
let currentUnit = '';
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
    });
}

getPublicIp();

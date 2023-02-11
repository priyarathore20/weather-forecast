let temp = document.getElementById('temp');

let currentCity = '';
let currentUnit = '';
let hourlyOrWeek = 'week';

// UPDATE DATE AND TIME
function getDateTime() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  hour = hour % 12;
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minuntes = '0' + minutes;
  }

  let dayString = days[now.getDays()];
  return `${('dayString')},${('Hour')}:`;
}

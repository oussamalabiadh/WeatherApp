// today card
var today = document.getElementById("today");
var todayDate = document.getElementById("today-date");
var cityLocation = document.getElementById("location");
var todayDegree = document.getElementById("today-degree");
var todayIcon = document.getElementById("today-icon");
var todayWeatherCase = document.getElementById("today-weather-case");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var compass = document.getElementById("compass");
// nextday and thirdday card
var nextday = document.querySelectorAll(".nextday");
var nextDayDate = document.querySelectorAll(".nextday-date");
var maxDegree = document.querySelectorAll(".max-degree");
var minDegree = document.querySelectorAll(".min-degree");
var nextDayWeatherCase = document.querySelectorAll(".nextday-weather-case");
var nextDayIcon = document.querySelectorAll(".nextday-icon");
// search part
var searchBar = document.getElementById("search-bar");

var weatherDetails;
var response;
var currentCity = "cairo";
var date;

var monthsNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
var daysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getWeatherData(currentCity) {
  response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=dc968ba480404bb08b2115839221504&q=${currentCity}&days=3`
  );
  weatherDetails = await response.json();
  displayTodayWeather();
  displayOtherDays();
}
getWeatherData(currentCity);

// current date
function displayTodayWeather() {
  date = new Date();
  today.innerHTML = daysNames[date.getDay()];
  todayDate.innerHTML = `${date.getDate()} ${monthsNames[date.getMonth()]}`;
  cityLocation.innerHTML = weatherDetails.location.name;
  todayDegree.innerHTML = weatherDetails.current.temp_c;
  todayIcon.setAttribute(
    "src",
    `https:${weatherDetails.current.condition.icon}`
  );
  todayWeatherCase.innerHTML = weatherDetails.current.condition.text;
  humidity.innerHTML = weatherDetails.current.humidity;
  wind.innerHTML = weatherDetails.current.wind_kph;
  compass.innerHTML = weatherDetails.current.wind_dir;
}

searchBar.addEventListener("keyup", function () {
  currentCity = searchBar.value;
  getWeatherData(currentCity);
});

// other days
function displayOtherDays() {
  for (var i = 0; i < nextday.length; i++) {
    nextday[i].innerHTML =
      daysNames[
        new Date(weatherDetails.forecast.forecastday[i + 1].date).getDay()
      ];
    maxDegree[i].innerHTML =
      weatherDetails.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML =
      weatherDetails.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayWeatherCase[i].innerHTML =
      weatherDetails.forecast.forecastday[i + 1].day.condition.text;
    nextDayIcon[i].setAttribute(
      "src",
      `https:${weatherDetails.forecast.forecastday[i + 1].day.condition.icon}`
    );
  }
}

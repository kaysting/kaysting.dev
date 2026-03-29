const elMain = document.querySelector('#main');
const elTime = document.querySelector('#time');
const elSecs = document.querySelector('#secs');
const elAmPm = document.querySelector('#ampm');
const elWeekday = document.querySelector('#weekday');
const elDate = document.querySelector('#date');
const elWeatherIcon = document.querySelector('#weatherIcon');
const elWeatherTemp = document.querySelector('#weatherTemp');
const elWeatherTempHigh = document.querySelector('#weatherTempHigh');
const elWeatherTempLow = document.querySelector('#weatherTempLow');
const elWeatherDesc = document.querySelector('#weatherDesc');
const elWeatherHumidity = document.querySelector('#weatherHumidity');
const elWeatherWind = document.querySelector('#weatherWind');
const elWeatherSunrise = document.querySelector('#weatherSunrise');
const elWeatherSunriseAmPm = document.querySelector('#weatherSunriseAmPm');
const elWeatherSunset = document.querySelector('#weatherSunset');
const elWeatherSunsetAmPm = document.querySelector('#weatherSunsetAmPm');

const sentenceCase = str => str.charAt(0).toUpperCase() + str.slice(1);

const degToDir = deg => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
};

async function fetchImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

const zip = 77006;
const coords = { lat: 29.737605, lon: -95.402015 };
let lastBgChange = 0;

const updateTime = async () => {
    elTime.innerText = dayjs().format('h:mm');
    elSecs.innerText = dayjs().format(':ss');
    elAmPm.innerText = dayjs().format('A');
    elWeekday.innerText = dayjs().format('dddd');
    elDate.innerText = dayjs().format('MMMM D, YYYY');
    const now = Date.now();
    if ((now-lastBgChange) > 60*1000) {
        const url = `snapshot.png?t=${now}`;
        const base64 = await fetchImageAsBase64(url);
        document.querySelector('#background').style.backgroundImage = `url(${base64})`;
        console.log(`Background updated`);
        lastBgChange = now;
    }
};
updateTime();
setInterval(updateTime, 1000);
const updateWeather = async () => {
    const key = 'a581bace8662ffc50d984219ebb56572';
    if (!coords.lat || !coords.lon) {
        const res = await axios.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${key}`);
        coords.lat = res.data.lat;
        coords.lon = res.data.lon;
    }
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${key}`);
    const data = res.data;
    elWeatherTemp.innerText = `${Math.round(data.main.temp)}°`;
    elWeatherTempHigh.innerText = `${Math.round(data.main.temp_max)}°`;
    elWeatherTempLow.innerText = `${Math.round(data.main.temp_min)}°`;
    elWeatherDesc.innerText = sentenceCase(data.weather[0].description);
    elWeatherIcon.src = `basmilius-weather-icons-filled/openweathermap/${data.weather[0].icon}.svg`;
    elWeatherHumidity.innerText = `${data.main.humidity}%`;
    elWeatherWind.innerText = `${degToDir(data.wind.deg)} ${Math.round(data.wind.speed)} mph`;
    elWeatherSunrise.innerText = dayjs(data.sys.sunrise * 1000).format('h:mm');
    elWeatherSunriseAmPm.innerText = dayjs(data.sys.sunrise * 1000).format('A');
    elWeatherSunset.innerText = dayjs(data.sys.sunset * 1000).format('h:mm');
    elWeatherSunsetAmPm.innerText = dayjs(data.sys.sunset * 1000).format('A');
};
updateWeather();
setInterval(updateWeather, 5*60*1000);

// Handle wake lock
let wakeLock = null;
const requestWakeLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock was released');
        });
        console.log('Wake Lock is active');
    } catch (err) {
        console.error(err);
    }
};
document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
    }
});
requestWakeLock();

// Handle fullscreen toggle
const btnFullscreen = document.querySelector('#fullscreen');
btnFullscreen.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        btnFullscreen.style.display = 'none';
    } else {
        btnFullscreen.style.display = '';
    }
});
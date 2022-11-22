'use strict';

const axios = require('axios');
let cache = require('./cache.js');

module.exports = getWeather;

function getWeather(lat, lon) {
  // key is for cache
  const key = 'weather-' + lat + lon;
  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit - weather');
  } else {
    console.log('Cache miss - weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherURL)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherResults) {
  try {
    const forecast = weatherResults.data.map(obj => {
      return new Forecast(obj);
    });
    return Promise.resolve(forecast);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(weatherDay) {
    this.date = weatherDay.datetime;
    this.description = weatherDay.weather.description;
  }
}

module.exports = getWeather;

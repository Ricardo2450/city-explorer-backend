'use strict';

console.log('my first server');

// REQUIRE
// In our servers, we have to use 'require instead of 'import'
// Here we will list the requirments for a server
const express = require('express');
// let weatherData = require('./data/weather.json');
// const axios = require('axios');
const getMovies = require('./Components/movie');
const getWeather = require('./Components/weather');


// creating a cache
// every time the server process a request from the front end. And the back makes the request to the API, we have that 
// search on this object


// let cache = {

//   // forecast/ topFIveMovies: <the data that I would send to the front end about Kittens>
//   // forecast:{
//   //   data:<the data that i would send to the front end>
//   //   timeStamp: <the time we put this in the cache>
//   // }
// };




// We need to bring in our .env file, so we'll use this after we have installed 
// 'npm i dotenv'
require('dotenv').config();

const cors = require('cors');


// const { timeStamp } = require('console');


// USE
// once we have required something , we have to use it
// Here is where we will assign the required file a cariable
// React does this in one step with 'import' - express takes 2 steps: require and use
//  This is just how express works
const app = express();


app.use(cors());

// define the port and validate that our .env is working
const PORT = process.env.PORT || 3002;

// If we see our server running on 3002, that means theres a problem with our .env file or how we are importing it.


// ROUTES
// this is where we will write handlers for our endpoints

// create a basic default route
// app.get() correlates to axios.get()
// app.get() takes in a parament or url in quotes, and callback function
// app.get('/', (request, response) => {
//   response.send('hello from our server');
// });

app.get('/weather', getWeather);

// app.get('/weather', async (request, response, next) => {
//   console.log('Hi from the weather endpoint');
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
// let city_nameRequest = request.query.city_name;

// let selectedCity = weatherData.find(weather => weather.city_name === city_nameRequest);
// console.log('selcetedCity', selectedCity);


// let cityPosition = lat + lon;

// let key = cityPosition + 'Data';


// let timeRightNow = Data.now();
// let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 7 * 4;
// let timeToTestCache = 1000 * 20;

// if (cache[key] && (timeRightNow - cache[key].timeStamp < timeToTestCache)) {
//   // if the data is already cached and it is recent enough, send the cached data
//   console.log('data is in the cache');
//   response.status(200).send(cache[key].data);
// } else {
//   // if the data isn't already cached, we need to make a new request to the API
//   console.log('the data is not in the cache');

//   let weatherResults = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
//   let forecast = weatherResults.data.data.map(obj => new Forecast(obj));

//   cache[key] = {
//     data: forecast,
//     timeStamp: Data.now()
//   }

//   // using the key we crated, add a property to the cache, with the value of the thing we are sending

// }



// let selectedCity = weatherData.find(city => city.city_name === cityName);
// console.log(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
// let weatherResults = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
// let forecast = weatherResults.data.data.map(obj => new Forecast(obj));

// console.log(weatherResults.data);

// let cityCleanedUp = [];

// for (let i = 0; i < weatherResults.data.length; i++) {
//   cityCleanedUp.push(new Forecast(weatherResults.data[i]));
// }
// console.log(cityCleanedUp);


// response.status(200).send(forecast);


// response.send(forecast);
// response.send('test');

//   } catch (error) {
//     next(error);
//   }
// });


app.get('/movie', getMovies);








app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('*', (request, response) => {
  response.send('That route does not exist');
});


// ERRORS
// handles and errors

app.use((error, request, response,) => {
  response.status(500).send(error.message);
});


// LISTEN
// start the server



// listen is express method, it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

'use strict';

console.log('my first server');

// REQUIRE
// In our servers, we have to use 'require instead of 'import'
// Here we will list the requirments for a server
const express = require('express');
// let weatherData = require('./data/weather.json');
const axios = require('axios');


// We need to bring in our .env file, so we'll use this after we have installed 
// 'npm i dotenv'
require('dotenv').config();

const cors = require('cors');
// const axios = require('axios');

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

app.get('/weather', async (request, response, next) => {
  console.log('Hi from the weather endpoint');
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let city_nameRequest = request.query.city_name;

    // let selectedCity = weatherData.find(weather => weather.city_name === city_nameRequest);
    // console.log('selcetedCity', selectedCity);



    // let selectedCity = weatherData.find(city => city.city_name === cityName);
// console.log(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
    let weatherResults = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
    let forecast = weatherResults.data.data.map(obj => new Forecast(obj));

    // console.log(weatherResults.data);

    // let cityCleanedUp = [];

    // for (let i = 0; i < weatherResults.data.length; i++) {
    //   cityCleanedUp.push(new Forecast(weatherResults.data[i]));
    // }
    // console.log(cityCleanedUp);

    response.send(forecast);
    // response.send('test');
    
  } catch (error) {
    next(error);
  }
});

app.get('/movie', async (request, response, next) => {
  try {
    let searchedCity = request.query.name;
    let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchedCity}&page=1&include_adult=false`);
    // https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${locationName}&page=1&include_adult=false

    // make a list of top five movie results
    let movies = movieResults.data.results.map(obj => new Movie(obj));
    let topFiveMovies = movies.slice(0, 5);
    response.send(topFiveMovies);

  } catch (error) {
    next(error);
  }
});

// route for photo request
// app.get('/photos', (req, res) => {
//   // extract values from the request
//   // `${process.env.REACT_APP_SERVER}/photos?searchQuery=${this.state.searchQuery}`
//   // console.log(req.query.searchQuery);
// let searchValue = req.query.searchQuery;


// let url = "api.unsplash url here"
// let results = axios.get(url);
// let picArray = results.data.results.map(pic => new Photo(pic));

//   res.send('results.data.results')
// })


// let lat = request.query.lat;
// let lon = request.query.lon;
// let cityName = request.query.cityName;
// response.send(cityName);
// }
// catch (error) {
//   next(error);
// }


// let searchQuary = weatherData.filter(city => (city.lat === lat && city.lon === lon && city.cityName === cityName));
// searchQuary.length < 1 ? response.status(500).send('Error. City not in data bank.') : response.status(200).send(searchQuary);
// })


// let locationSearch = new locationsForecast(searchQuary);
// response.send(locationSearch);
app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('*', (request, response) => {
  response.send('That route does not exist');
});


// ERRORS
// handles and errors

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// Classes
// class locationsForecast {
//   constructor(locationObj) {
//     this.city = locationObj.city_name;
//     this.lon = locationObj.lon;
//     this.lat = locationObj.lat;
//     this.description = locationObj.description;
//     this.datetime = locationObj.datetime;
//   }
// }

class Forecast {
  constructor(weatherDay) {
    this.date = weatherDay.datetime;
    this.description = weatherDay.weather.description;
  }
}

class Movie {
  constructor(movie) {
    this.releaseDate = movie.release_date;
    this.title = movie.title;
    this.overview = movie.overview;
    this.url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }
}

// class Photo {
//   constructor(picObj) {
//     this.src= picObj.urls.regular;
//     this.alt= picObj.alt_description;
//     this.artist = picObj.user.name;
//   }
// }


// LISTEN
// start the server



// listen is express method, it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

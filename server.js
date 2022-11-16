'use strict';

console.log('my first server');

// REQUIRE
// In our servers, we have to use 'require instead of 'import'
// Here we will list the requirments for a server
const express = require('express');
let weatherData = require('./weather.json');


// We need to bring in our .env file, so we'll use this after we have installed 
// 'npm i dotenv'
require('dotenv').config();

const cors = require('cors');

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
app.get('/', (request, response) => {
  response.send('hello from our server');
});

app.get('/weather', (request, response) => {
  // try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityName = request.query.city_name;
    // response.send(cityName);
  // }
  // catch (error) {
  //   next(error);
  // }
// let selectedCity = weatherData.find(city => city.city_name === cityName);

// let filterCity = new locationsForecast(selectedCity);
// response.send(filterCity);

  let searchQuary = weatherData.filter(city => (city.lat === lat && city.lon === lon && city.cityName === cityName));
  searchQuary.length < 1 ? response.status(500).send('Error. City not in data bank.') : response.status(200).send(searchQuary);



  let locationSearch = new locationsForecast(searchQuary);
  response.send(locationSearch);
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
class locationsForecast {
  constructor(locationObj) {
    this.city = locationObj.city_name;
    this.lon = locationObj.lon;
    this.lat = locationObj.lat;
    this.description = locationObj.description;
    this.datetime = locationObj.datetime;
  }
}


// LISTEN
// start the server



// listen is express method, it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

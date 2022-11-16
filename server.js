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



// USE
// once we have required something , we have to use it
// Here is where we will assign the required file a cariable
// React does this in one step with 'import' - express takes 2 steps: require and use
//  This is just how express works
const app = express();

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
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuary = weatherData.filter(city => (city.lat ===lat && city.lon === lon));
  searchQuary.length < 1 ? response.status(500).send('Error. City not in data bank.') : response.status(200).send(searchQuary);
  
  let locationSearch = new locations(searchQuary);
  response.send(locationSearch);
});

app.get('*', (request, response) => {
  response.send('That route does not exist');
});


// ERRORS
// handles and errors


// Classes
class locations {
  constructor(locationObj) {
    this.name = locationObj.name;
    this.lon = locationObj.lon;
    this.lat = locationObj.lat;
  }
}


// LISTEN
// start the server



// listen is express method, it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listing on port ${PORT}`));

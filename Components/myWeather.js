// const axios = require('axios');

// let getWeather = async (request, response, next) => {
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let weatherResults = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`);
//     console.log('weatherResults: ', weatherResults);
//     let forecast = weatherResults.data.data.map(obj => new Forecast(obj));
//     console.log('forecast: ', forecast);
//     response.send(forecast);
//   } catch (error) {
//     next(error);
//   }
// };

// class Forecast {
//   constructor(weatherDay) {
//     this.date = weatherDay.datetime;
//     this.description = weatherDay.weather.description;
//   }
// }

// module.exports = getWeather;

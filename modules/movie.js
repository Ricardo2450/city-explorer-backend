'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getMovies(selectedCity) {
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1&include_adult=false`;
  console.log(movieURL);
  let key = `movies-${selectedCity}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 10000)) {
    console.log('Cache hit - movies');
  } else {
    console.log('Cache miss - movies');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(movieURL)
      .then(res => {
        return parseMovies(res.data);
      });
  }
  return cache[key].data;
}

function parseMovies(movieResults) {
  console.log('Hi');
  try {
    const movies = movieResults.results.map(obj => {
      return new Movie(obj);
    });
    console.log(movies);
    let topFiveMovies = movies.slice(0, 5);
    return Promise.resolve(topFiveMovies);
  } catch (e) {
    return Promise.reject(e);
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

module.exports = getMovies;

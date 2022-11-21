// 'use strict'
// const axios = require('axios');

// let getMovies = async (request, response, next) => {
//   try {
//     let searchedCity = request.query.name;
//     let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchedCity}&page=1&include_adult=false`);
//     let movies = movieResults.data.results.map(obj => new Movie(obj));
//     let topFiveMovies = movies.slice(0, 5);
//     response.send(topFiveMovies);

//   } catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// };
// class Movie {
//   constructor(movie) {
//     this.releaseDate = movie.release_date;
//     this.title = movie.title;
//     this.overview = movie.overview;
//     this.url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//   }
// }

// module.exports = getMovies;

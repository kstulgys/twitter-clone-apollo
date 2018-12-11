// // import { RESTDataSource } from "apollo-datasource-rest";
// const { RESTDataSource } = require("apollo-datasource-rest");
// // this.baseURL = `https://api.themoviedb.org/3/movie/550?api_key=d0d718f69479577b4a5732c80cbb43d8`;

// class MovieAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = `https://api.themoviedb.org/3`;
//   }

//   // async get20Movies(page) {
//   //   let { results } = await this.get(
//   //     `/discover/movie?api_key=${
//   //       process.env.TMDB_API_KEY
//   //     }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`,
//   //   )
//   //   return results.map(movie => this.movieReducer(movie))
//   // }

//   async getAllMovies() {
//     let moviesArray = [];
//     let { total_pages, total_results } = await this.get(
//       `/discover/movie?api_key=${
//         process.env.TMDB_API_KEY
//       }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`
//     );
//     const pages = total_pages > 5 ? 5 : total_pages;
//     let page = 1;
//     while (page <= pages) {
//       let { results } = await this.get(
//         `/discover/movie?api_key=${
//           process.env.TMDB_API_KEY
//         }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
//       );
//       const arrayToPush = results.map(movie => this.movieReducer(movie));
//       moviesArray = [...moviesArray, ...arrayToPush];
//       page++;
//     }
//     // console.log(moviesArray.length)
//     return moviesArray;
//   }

//   movieReducer(movie) {
//     const image_url = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
//     const {
//       vote_count,
//       id,
//       genre_ids,
//       title,
//       vote_average,
//       release_date
//     } = movie;
//     return {
//       vote_count,
//       id,
//       genre_ids,
//       image_url,
//       title,
//       vote_average,
//       release_date
//     };
//   }

//   async getAllGenres() {
//     const { genres } = await this.get(
//       `/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
//     );
//     return genres;
//   }

//   async getMoviesWithParameters(
//     genreId,
//     yearMin,
//     yearMax,
//     ratingMin,
//     ratingMax,
//     runtimeMin,
//     runtimeMax
//   ) {
//     console.log(genreId);
//     const moviesUrl =
//       `/discover/movie?` +
//       `api_key=${process.env.TMDB_API_KEY}&` +
//       `language=en-US&sort_by=popularity.desc&` +
//       `with_genres=${genreId}&` +
//       `primary_release_date.gte=${yearMin}-01-01&` +
//       `primary_release_date.lte=${yearMax}-12-31&` +
//       `vote_average.gte=${ratingMin}&` +
//       `vote_average.lte=${ratingMax}&` +
//       `with_runtime.gte=${runtimeMin}&` +
//       `with_runtime.lte=${runtimeMax}&` +
//       `page=1`;
//     const { results } = await this.get(moviesUrl);
//     return results;
//   }

//   async findMoviesById(ids) {
//     // console.log('ids in fmbid:', ids)
//     const res = ids.map(id => {
//       return this.get(`/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
//     });
//     return await Promise.all(res);
//   }
// }
// module.exports = MovieAPI;

// //   this.baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${
// //     process.env.TMDB_API_KEY
// //   }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=10`
// // }

// // `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
// //   launchReducer(launch) {
// //     return {
// //       id: launch.flight_number || 0,
// //       cursor: `${launch.launch_date_unix}`,
// //       site: launch.launch_site && launch.launch_site.site_name,
// //       mission: {
// //         name: launch.mission_name,
// //         missionPatchSmall: launch.links.mission_patch_small,
// //         missionPatchLarge: launch.links.mission_patch
// //       },
// //       rocket: {
// //         id: launch.rocket.rocket_id,
// //         name: launch.rocket.rocket_name,
// //         type: launch.rocket.rocket_type
// //       }
// //     };
// //   }

// //   async getLaunchById({ launchId }) {
// //     const res = await this.get("launches", { flight_number: launchId });
// //     return this.launchReducer(res[0]);
// //   }

// //   getLaunchesByIds({ launchIds }) {
// //     return Promise.all(
// //       launchIds.map(launchId => this.getLaunchById({ launchId }))
// //     );
// //   }
// // }

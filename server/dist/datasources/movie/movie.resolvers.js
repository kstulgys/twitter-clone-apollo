'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paginate = require('../../utils/paginate');

var _user = require('../../models/user/user.model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const pageNum = 1
// const pageSize = 20
// const currentYear = new Date().getFullYear()

// const watchedBy = async (listMovie, args) => {
//   return await User.find({ watched: { $in: [listMovie.id] } })
//     .lean()
//     .exec()
// }

// const infiniteScrollMovies = async (_, { offset = 0, limit = 20 }, { dataSources }) => {
//   let allMovies = await dataSources.movieAPI.getAllMovies()
//   const { movies, hasMore, newOffset } = paginateResults(allMovies, offset, limit)
//   return {
//     movies,
//     hasMore,
//     newOffset,
//   }
// }

const getAllGenres = (() => {
  var _ref = _asyncToGenerator(function* (_, args, { dataSources }) {
    return yield dataSources.movieAPI.getAllGenres();
  });

  return function getAllGenres(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    getAllGenres
    // infiniteScrollMovies,
  }
  //   Movie: {
  //     watchedBy,
  //   },


  //   listMoviesWithParameters: async (
  //     _,
  //     {
  //       input: {
  //         genreId = 18,
  //         yearMin = currentYear - 3,
  //         yearMax = currentYear,
  //         ratingMin = 7,
  //         ratingMax = 10,
  //         runtimeMin = 100,
  //         runtimeMax = 180,
  //         pageNum = 1,
  //         pageSize = 5,
  //       },
  //     },
  //     { dataSources },
  //   ) => {
  //     console.log('Im in genreId listMoviesWithParameters', genreId)
  //     const allMovies = await dataSources.movieAPI.getMoviesWithParameters(
  //       genreId,
  //       yearMin,
  //       yearMax,
  //       ratingMin,
  //       ratingMax,
  //       runtimeMin,
  //       runtimeMax,
  //     )
  //     console.log(allMovies)
  //     const { movies, hasMore } = paginateResults(allMovies, pageNum, pageSize)
  //     return {
  //       movies,
  //       hasMore,
  //     }
  //   },

};
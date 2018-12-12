// import { paginateResults } from './utils'
// // const pageNum = 1
// // const pageSize = 20
// const currentYear = new Date().getFullYear()

// export default {
//   Movie: {
//     watchedBy: async (listMovie, __, { dataSources }) => {
//       return await dataSources.userAPI.getWatchedByUsers(listMovie.id)
//     },
//   },
//   Query: {
//     infiniteScrollMovies: async (_, { offset = 0, limit = 20 }, { dataSources }) => {
//       let allMovies = await dataSources.movieAPI.getAllMovies()
//       const { movies, hasMore, newOffset } = paginateResults(allMovies, offset, limit)
//       return {
//         movies,
//         hasMore,
//         newOffset,
//       }
//     },
//     ///
//     listGenres: async (_, __, { dataSources }) => {
//       return await dataSources.movieAPI.getAllGenres()
//     },

//     listUsers: async (_, __, { dataSources }) => {
//       return await dataSources.userAPI.getAllUsers()
//     },

//     me: async (_, __, { dataSources }) => {
//       const me = await dataSources.userAPI.getCurrentUser()
//       const watched = await dataSources.movieAPI.findMoviesById(me.watched)
//       const watchLater = await dataSources.movieAPI.findMoviesById(me.watchLater)
//       return { ...me, watched, watchLater }
//     },

//     //   listMoviesWithParameters: async (
//     //     _,
//     //     {
//     //       input: {
//     //         genreId = 18,
//     //         yearMin = currentYear - 3,
//     //         yearMax = currentYear,
//     //         ratingMin = 7,
//     //         ratingMax = 10,
//     //         runtimeMin = 100,
//     //         runtimeMax = 180,
//     //         pageNum = 1,
//     //         pageSize = 5,
//     //       },
//     //     },
//     //     { dataSources },
//     //   ) => {
//     //     console.log('Im in genreId listMoviesWithParameters', genreId)
//     //     const allMovies = await dataSources.movieAPI.getMoviesWithParameters(
//     //       genreId,
//     //       yearMin,
//     //       yearMax,
//     //       ratingMin,
//     //       ratingMax,
//     //       runtimeMin,
//     //       runtimeMax,
//     //     )
//     //     console.log(allMovies)
//     //     const { movies, hasMore } = paginateResults(allMovies, pageNum, pageSize)
//     //     return {
//     //       movies,
//     //       hasMore,
//     //     }
//     //   },
//   },
//   Mutation: {
//     login: async (_, { email }, { dataSources }) => {
//       const user = await dataSources.userAPI.findOrCreateUser(email)
//       if (user) return new Buffer(email).toString('base64')
//     },

//     addToWatched: async (_, { id }, { dataSources }) => {
//       await dataSources.userAPI.addToWatched(id)
//       return id
//     },

//     addToWatchLater: async (_, { id }, { dataSources }) => {
//       await dataSources.userAPI.addToWatchLater(id)
//       return id
//     },

//     deleteFromWatched: async (_, { id }, { dataSources }) => {
//       await dataSources.userAPI.deleteWatchedId(id)
//       return id
//     },

//     deleteFromWatchLater: async (_, { id }, { dataSources }) => {
//       await dataSources.userAPI.deleteWatchLaterId(id)
//       return id
//     },
//   },
// }

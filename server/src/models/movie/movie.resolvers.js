// import User from "./user.model"
// import Movie from "./user.model"

// import { AuthenticationError } from "apollo-server"
// // import { newApiKey } from '../../utils/auth'

// const requireAuth = user => {
//     if (!user) {
//       throw new AuthenticationError()
//     }
//   }

// const getUserMovies= async (_, args, { user }) => {
//       await requireAuth(user);
//     //   const allMovies = MovieAPI.getMovies()
//       const watchedMovies = Movie.findOne({ userId: user._id });
//       const [tweets, favorites] = await Promise.all([p1, p2]);
//     }
// }

// const addWatched = async (_, { id }, { user }) => {
//   await requireAuth(user)

//   await User.findByIdAndUpdate(
//     user._id,
//     { $pull: { watchLater: id }, $addToSet: { watched: id } },
//     { new: true }
//   )
//     .lean()
//     .exec()
//   return id
// }

// const addWatchLater = async (_, { id }, { user }) => {
//   await requireAuth(user)

//   await User.findByIdAndUpdate(
//     user._id,
//     { $pull: { watched: id }, $addToSet: { watchLater: id } },
//     { new: true }
//   )
//   return id
// }

// const removeWatched = async (_, { id }, { user }) => {
//   await requireAuth(user)

//   await User.findByIdAndUpdate(
//     user._id,
//     { $pull: { watched: id } },
//     { new: true }
//   )
//   return id
// }

// const removeWatchLater = async (_, { id }, { user }) => {
//   await requireAuth(user)

//   await User.findByIdAndUpdate(
//     user._id,
//     { $pull: { watchLater: id } },
//     { new: true }
//   )
//   return id
// }

// export default {
//   Query: {
//     getWatched,
//     getWatchLater
//   },
//   Mutation: {
//     addWatched,
//     addWatchLater,
//     removeWatched,
//     removeWatchLater
//   }
// }

// // extend type Query {
// //     watched: [ID]!
// //     watched: [ID]!
// //   }

// //   extend type Mutation {
// //     addWatched(id: Int): Int!
// //     addWatchLater(id: Int): Int!
// //     removeWatched(id: Int): Int!
// //     removeWatchLater(id: Int): Int!
// //   }

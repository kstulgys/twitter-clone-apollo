// import { gql } from 'apollo-server'

// const typeDefs = gql`
//   type Query {
//     # listMoviesWithParameters(input: MovieInput): MoviesPage
//     listGenres: [Genre]!
//     listUsers: [User]!
//     me: User
//     infiniteScrollMovies(offset: Int, limit: Int): MoviesPage
//   }

//   type MoviesPage {
//     movies: [Movie]!
//     hasMore: Boolean
//     newOffset: Int
//   }

//   type Mutation {
//     login(email: String): String
//     addToWatched(id: Int): Int!
//     addToWatchLater(id: Int): Int!
//     deleteFromWatched(id: Int): Int!
//     deleteFromWatchLater(id: Int): Int!
//   }

//   type Message {
//     message: String
//   }

//   input MovieInput {
//     genreId: Int
//     yearMin: Int
//     yearMax: Int
//     ratingMin: Int
//     ratingMax: Int
//     runtimeMin: Int
//     runtimeMax: Int
//     pageNum: Int
//     pageSize: Int
//   }

//   type Movie {
//     vote_count: Int
//     id: ID
//     genre_ids: [ID]
//     image_url: String
//     title: String
//     vote_average: String
//     release_date: String
//     watchedBy: [User]!
//   }

//   type Genre {
//     id: ID
//     name: String
//   }

//   type User {
//     _id: ID!
//     email: String!
//     avatar: String!
//     watched: [Movie]!
//     watchLater: [Movie]!
//   }
// `

// module.exports = typeDefs
"use strict";
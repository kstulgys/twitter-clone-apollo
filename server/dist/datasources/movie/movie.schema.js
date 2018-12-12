'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServer = require('apollo-server');

exports.default = _apolloServer.gql`
  type User {
    _id: ID!
    email: String!
    avatar: String!
    watched: [ID]!
    watchLater: [ID]!
  }

  type Movie {
    vote_count: Int
    id: ID
    genre_ids: [ID]
    image_url: String
    title: String
    vote_average: String
    release_date: String
    watchedBy: [User]!
  }

  type MoviesPage {
    movies: [Movie]!
    hasMore: Boolean
    newOffset: Int
  }

  input MovieInput {
    genreId: Int
    yearMin: Int
    yearMax: Int
    ratingMin: Int
    ratingMax: Int
    runtimeMin: Int
    runtimeMax: Int
    pageNum: Int
    pageSize: Int
  }

  type Genre {
    id: ID
    name: String
  }

  type extend Query {
    # listMoviesWithParameters(input: MovieInput): MoviesPage
    listGenres: [Genre]!
    infiniteScrollMovies(offset: Int, limit: Int): MoviesPage
  }
`;
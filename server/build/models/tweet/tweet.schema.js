'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServer = require('apollo-server');

exports.default = _apolloServer.gql`
  type Tweet {
    _id: ID!
    text: String!
    user: User
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]!
    getUserTweets: [Tweet]!
  }

  extend type Mutation {
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String!): Tweet
    deleteTweet(_id: ID!): Tweet
    favoriteTweet(_id: ID!): Tweet
  }
  extend type Subscription {
    tweetAdded: Tweet
    tweetFavorited: Tweet
  }
`;
import { gql } from 'apollo-server'

export default gql`
  type Tweet {
    _id: ID!
    text: String!
    createdAt: String!
    updatedAt: String!
    user: User
    favoriteCount: Int!
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
  }
  extend type Subscription {
    tweetAdded: Tweet
  }
`
// schema {
//   query: Query
//   mutation: Mutation
// }

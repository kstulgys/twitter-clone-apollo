import { gql } from "apollo-server"

export default gql`
  type User {
    _id: ID!
    email: String!
    avatar: String!
    # watched: [ID]!
    # watchLater: [ID]!
  }

  extend type Query {
    me: User
    listUsers: [User]!
  }

  extend type Mutation {
    login(email: String): String
    # addWatched(id: Int): Int!
    # addWatchLater(id: Int): Int!
    # removeWatched(id: Int): Int!
    # removeWatchLater(id: Int): Int!
  }
`

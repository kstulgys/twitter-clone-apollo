import { gql } from 'apollo-server'

export default gql`
  type User {
    _id: ID!
    email: String!
    avatar: String!
    username: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type Auth {
    token: String
  }

  extend type Query {
    getUsers: [User]!
    me: User
  }

  extend type Mutation {
    signup(email: String, password: String!, username: String!): Auth
    login(email: String, password: String!): Auth
  }
`
// schema {
//   query: Query
//   mutation: Mutation
// }

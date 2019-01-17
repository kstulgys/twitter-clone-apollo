require('dotenv').config()
import { ApolloServer, gql } from 'apollo-server'
import { connect } from './db'
import { merge } from 'lodash'
import { authenticate } from './utils/auth'
import config from './config'

import tweetSchema from './models/tweet/tweet.schema'
import userSchema from './models/user/user.schema'

import tweetResolvers from './models/tweet/tweet.resolvers'
import userResolvers from './models/user/user.resolvers'

import createFakeTweets from './mocks/tweet'

import { PubSub } from 'apollo-server'
export const pubsub = new PubSub()

export const start = async () => {
  const rootSchema = gql`
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
    type Subscription {
      _: Boolean
    }
  `
  const server = new ApolloServer({
    typeDefs: [rootSchema, userSchema, tweetSchema],
    resolvers: merge({}, userResolvers, tweetResolvers),
    async context({ req, connection }) {
      let user = null

      if (connection) {
        const re = connection.context.authorization
        user = await authenticate(connection)
      } else {
        user = await authenticate(req)
      }
      // console.log(user)
      return { user }
    }
    // introspection: true
  })

  await connect(config.dbUrl)
  // await createFakeTweets()
  const { url } = await server.listen({
    port: process.env.PORT || config.port
    // port: process.env.PORT || config.port
  })

  console.log(`GQL server ready at ${url}`)
}

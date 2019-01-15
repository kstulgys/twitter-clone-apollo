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
      if (connection) {
        // check connection for metadata
        return connection.context
      } else {
        const user = await authenticate(req)
        return { user }
      }
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

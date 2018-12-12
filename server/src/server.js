require('dotenv').config()
import { ApolloServer, gql } from 'apollo-server'
import { connect } from './db'
import config from './config'
import { authenticate } from './utils/auth'
import userSchema from './models/user/user.schema'
import userResolvers from './models/user/user.resolvers'
import movieSchema from './datasources/movie/movie.schema'
import movieResolvers from './datasources/movie/movie.resolvers'
import MovieAPI from './datasources/movie'

export const start = async () => {
  // const rootSchema = `
  //   schema {
  //     query: Query
  //     mutation: Mutation
  //   }
  // `

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
    typeDefs: [rootSchema, userSchema, movieSchema],
    resolvers: [userResolvers, movieResolvers],
    dataSources: () => ({
      movieAPI: new MovieAPI(),
    }),
    async context({ req }) {
      const user = await authenticate(req)
      return { user }
    },
    introspection: true,
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({
    port: process.env.PORT || config.port,
  })

  console.log(`GQL server ready at ${url}`)
}

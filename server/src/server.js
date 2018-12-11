require('dotenv').config()
import { ApolloServer } from 'apollo-server'
import { connect } from './db'
import config from './config'
import isEmail from 'isemail'
import createStore from './models'
import typeDefs from './schema'
import resolvers from './resolvers'
// import MovieAPI from './datasources/movie'
// import UserAPI from './datasources/user'
// const store = createStore()
// set up any dataSources our resolvers need
// const dataSources = () => ({
//   movieAPI: new MovieAPI(),
//   userAPI: new UserAPI(),
// })

// the function that sets up the global context for each resolver, using the req

export const start = async () => {
  // const context = async ({ req }) => {
  //   // simple auth check on every request
  //   const auth = (req.headers && req.headers.authorization) || ''
  //   const email = new Buffer(auth, 'base64').toString('ascii')
  //   // if the email isn't formatted validly, return null for user
  //   if (!isEmail.validate(email)) return { user: null }
  //   // find a user by their email
  //   let user = await store.User.findOne({ email })
  //   // console.log('user from context', user)
  //   return { user: user && { ...user._doc } }
  // }
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dataSources,
    // context,
    //   async context({ req }) {
    //     const user = await authenticate(req)
    //     return { user }
    //   }
    introspection: true,
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: process.env.PORT || config.port })

  console.log(`GQL server ready at ${url}`)

  // server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`)
  // })
}

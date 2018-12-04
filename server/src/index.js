require('dotenv').config()
const { ApolloServer, AuthenticationError } = require('apollo-server')
const isEmail = require('isemail')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { createStore } = require('./models')

const MovieAPI = require('./datasources/movie')
const UserAPI = require('./datasources/user')

//// const internalEngineDemo = require('./engine-demo');

//// creates a sequelize connection once. NOT for every request
const store = createStore()
// store.User.create({ email: 'hahaha@hahaha.com' })
// set up any dataSources our resolvers need
const dataSources = () => ({
  movieAPI: new MovieAPI(),
  userAPI: new UserAPI({ store }),
})

////// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || ''
  const email = new Buffer(auth, 'base64').toString('ascii')
  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null }
  // find a user by their email
  let user = await store.User.findOne({ email })

  return user && { user: { ...user._doc } }
}

// Set up Apollo Server //
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  //   engine: {
  //     apiKey: process.env.ENGINE_API_KEY,
  //     ...internalEngineDemo,
  //   },
})

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
// if (process.env.NODE_ENV !== 'test')
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
// export all the important pieces for integration/e2e tests to use
// module.exports = {
//   dataSources,
//   context,
//   typeDefs,
//   resolvers,
//   ApolloServer,
//   LaunchAPI,
//   UserAPI,
//   store,
//   server,
// };

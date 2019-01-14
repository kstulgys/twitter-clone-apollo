import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import './index.css'
import App from './App'
import { resolvers, typeDefs } from './resolvers'
import SignUp from './SignUp'

// import * as serviceWorker from './serviceWorker'
// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://twitter-clone-apollo-server.herokuapp.com',
    headers: {
      authorization: localStorage.getItem('token') || ''
      //   'client-name': 'Space Explorer [web]',
      //   'client-version': '1.0.0'
    }
  }),
  initializers: {
    isLoggedIn: () => !!localStorage.getItem('token')
    // cartItems: () => []
  },
  resolvers,
  typeDefs
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <App /> : <SignUp />)}
    </Query>
  </ApolloProvider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()

import 'antd/dist/antd.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import createNetworkInterface, { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import App from './components/App'
import { resolvers, typeDefs } from './resolvers'
import SignUp from './components/SignUp'
import AuthUserProvider from './context/authUserContext'

const wsLink = new WebSocketLink({
  uri: 'wss://twitter-clone-apollo-server.herokuapp.com/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token') || ''
    }
  }
})
const httpLink = new HttpLink({
  uri: 'https://twitter-clone-apollo-server.herokuapp.com/graphql',
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    // console.log({ query: query, kind: kind, operation: operation })
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link,
  initializers: {
    isLoggedIn: () => !!localStorage.getItem('token')
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
    <AuthUserProvider client={client}>
      <Query query={IS_LOGGED_IN}>
        {({ data }) => (data.isLoggedIn ? <App /> : <SignUp />)}
      </Query>
    </AuthUserProvider>
  </ApolloProvider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()

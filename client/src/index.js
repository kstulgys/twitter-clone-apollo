import 'antd/dist/antd.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import App from './components/App'
import { resolvers, typeDefs } from './resolvers'
import SignUp from './components/SignUp'
import AuthUserProvider from './context/authUserContext'

const authLink = new HttpLink({
  uri: 'https://twitter-clone-apollo-server.herokuapp.com',
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})

const WebSoc = new SubscriptionClient(
  'ws://twitter-clone-apollo-server.herokuapp.com',
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token') || ''
    }
  }
)

const wsLink = new WebSocketLink(WebSoc)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink
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

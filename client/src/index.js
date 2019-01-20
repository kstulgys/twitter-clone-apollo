import 'antd/dist/antd.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

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
import LoginPage from './components/SignUp'
import AuthUserProvider from './context/authUserContext'

import LoginRoute from './LoginRoute'
import ProtectedRoute from './ProtectedRoute'

// import { useAuthUser } from './context/authUserContext'

///localhost:4000/
// uri: 'wss://twitter-clone-apollo-server.herokuapp.com/graphql',
// uri: 'https://twitter-clone-apollo-server.herokuapp.com/graphql',

const userToken = localStorage.getItem('token') || ''

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: userToken
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: userToken
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

function RootApp() {
  return (
    <ApolloProvider client={client}>
      <AuthUserProvider client={client} userToken={userToken}>
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <LoginRoute exact path='/auth' component={LoginPage} />
              <ProtectedRoute exact path='/' component={App} />
              <Route path='*' render={props => <Redirect to='/' />} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthUserProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))

// function Root() {
//   return (
//     <ApolloProvider client={client}>
//       <AuthUserProvider client={client}>
//         <Query query={IS_LOGGED_IN}>
//           {({ data }) => (data.isLoggedIn ? <App /> : <SignUp />)}
//         </Query>
//       </AuthUserProvider>
//     </ApolloProvider>
//   )
// }

// <ApolloProvider client={client}>
// <AuthUserProvider client={client}>
//   <Query query={IS_LOGGED_IN}>
//     {({ data }) => (data.isLoggedIn ? <App /> : <SignUp />)}
//   </Query>
// </AuthUserProvider>
// </ApolloProvider>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()

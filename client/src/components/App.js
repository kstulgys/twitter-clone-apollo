import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AppLayout from '../AppLayout'
import Feed from './Feed'

const logedIn = false

function App() {
  return <AppLayout feed={<Feed />} />
}

// <ul>
//   {data &&
//     data.getTweets &&
//     data.getTweets.map(t => <li key={t._id}>{t.text}</li>)}
// </ul>

export default App

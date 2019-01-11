import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AppLayout from './AppLayout'
import './App.css'
import Feed from './Feed'

function App() {
  return (
    <div>
      <AppLayout feed={<Feed />} />
    </div>
  )
}

// <ul>
//   {data &&
//     data.getTweets &&
//     data.getTweets.map(t => <li key={t._id}>{t.text}</li>)}
// </ul>

export default App

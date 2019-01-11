import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
      user {
        username
        avatar
      }
    }
  }
`
function App() {
  return (
    <Query
      query={GET_TWEETS}
      // notifyOnNetworkStatusChange={true}
      // fetchPolicy='network-only'
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) return <h1>{error.message}</h1>
        if (loading) return <h1 className="red text-center">Loading...</h1>

        return (
          <>
            <div className="flex justify-center">
              <div className="dn-m w-20-l bg-warning">
                <h1 className="text-default">Left Sidebar</h1>
              </div>
              <div className="flex items-center flex-column w-30-l w-90-m">
                <ul>
                  {data &&
                    data.getTweets &&
                    data.getTweets.map(t => <li key={t._id}>{t.text}</li>)}
                </ul>
              </div>
              <div className="dn-m w-20-l bg-warning">
                <h1 className="text-default">Right Sidebar</h1>
              </div>
            </div>
          </>
        )
      }}
    </Query>
  )
}

export default App

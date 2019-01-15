import React from 'react'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import Tweet from './Tweet'
import Spinner from './Spinner'

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
      createdAt
      favoriteCount
      user {
        username
      }
    }
  }
`
function Feed() {
  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error, fetchMore }) => {
        if (error) return <h1>{error.message}</h1>
        if (loading) return <Spinner />
        return (
          <>
            {data &&
              data.getTweets &&
              data.getTweets.map(tweet => (
                <Tweet key={tweet._id} tweet={tweet} />
              ))}
          </>
        )
      }}
    </Query>
  )
}

export default Feed

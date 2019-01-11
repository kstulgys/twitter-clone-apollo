import React from 'react'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import Tweet from './Tweet'

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
    }
  }
`
function Feed() {
  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error, fetchMore }) => {
        if (error) return <h1>{error.message}</h1>
        if (loading) return <h1>Loading...</h1>
        return (
          <>
            {data &&
              data.getTweets &&
              data.getTweets.map(t => <Tweet key={t._id} text={t.text} />)}
          </>
        )
      }}
    </Query>
  )
}

export default Feed

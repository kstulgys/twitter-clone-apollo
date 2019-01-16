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

const NEW_TWEETS_SUBS = gql`
  subscription tweetAdded {
    tweetAdded {
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
  const subscribeToNewTweets = async ({ subscribeToMore }) => {
    subscribeToMore({
      document: NEW_TWEETS_SUBS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newTweet = subscriptionData.data.tweetAdded
        if (!prev.getTweets.find(t => t._id === newTweet._id)) {
          return {
            ...prev,
            getTweets: [{ ...newTweet }, ...prev.getTweets]
          }
        }
        return prev
      }
    })
  }
  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error, fetchMore, subscribeToMore }) => {
        if (error) return <h1>{error.message}</h1>
        if (loading) return <Spinner />
        subscribeToNewTweets({ subscribeToMore })
        return (
          <>
            {data &&
              data.getTweets &&
              data.getTweets.map(tweet => <Tweet key={tweet._id} {...tweet} />)}
          </>
        )
      }}
    </Query>
  )
}

export default Feed

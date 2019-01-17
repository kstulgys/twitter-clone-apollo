import React, { useEffect } from 'react'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import Tweet from './Tweet'
import Spinner from './Spinner'
import TweetsSkeleton from './TweetsSkeleton'
import { useAuthUser } from '../context/authUserContext'

const GET_TWEETS = gql`
  query getTweets {
    getTweets {
      text
      _id
      createdAt
      isFavorited
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
      isFavorited
      favoriteCount
      user {
        username
      }
    }
  }
`
const TWEET_FAVORITED_SUBS = gql`
  subscription {
    tweetFavorited {
      _id
      favoriteCount
    }
  }
`
function Feed() {
  // const { user } = useAuthUser()

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

  const subscribeToNewFavorites = async ({ subscribeToMore }) => {
    subscribeToMore({
      document: TWEET_FAVORITED_SUBS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const favTweet = subscriptionData.data.tweetFavorited
        return {
          ...prev,
          getTweets: prev.getTweets.map(tweet =>
            tweet._id === favTweet._id
              ? {
                  ...tweet,
                  favoriteCount: favTweet.favoriteCount
                }
              : tweet
          )
        }
      }
    })
  }

  useEffect(() => {
    // const sub1 = subscribeToNewTweets
    // const sub2 = subscribeToNewFavorites
    // return () => {
    //   sub1()
    //   sub2()
    // }
  })

  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error, fetchMore, subscribeToMore }) => {
        if (error) return <h1>{error.message}</h1>
        if (loading) return <TweetsSkeleton />
        subscribeToNewTweets({ subscribeToMore })
        subscribeToNewFavorites({ subscribeToMore })

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

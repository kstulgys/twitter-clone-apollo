import Tweet from './tweet.model'
import FavoriteTweet from './favoriteTweet.model'
import User from '../user/user.model'

import { requireAuth } from '../../utils/auth'
import { PubSub } from 'apollo-server'
const pubsub = new PubSub()

const TWEET_ADDED = 'tweetAdded'
const TWEET_FAVORITED = 'tweetFavorited'

const getTweets = async (_, args, { user }) => {
  const p1 = Tweet.find({}).sort({ createdAt: -1 })
  const p2 = FavoriteTweet.findOne({ userId: user._id })

  const [tweets, favorites] = await Promise.all([p1, p2])
  const tweetsToSend = tweets.reduce((arr, tweet) => {
    const tw = tweet.toJSON()
    if (favorites.tweets.some(t => t.equals(tw._id))) {
      arr.push({
        ...tw,
        isFavorited: true
      })
    } else {
      arr.push({
        ...tw,
        isFavorited: false
      })
    }
    return arr
  }, [])

  return tweetsToSend
}

const getUserTweets = async (_, args, { user }) => {
  return Tweet.find({ user: user._id }).sort({ createdAt: -1 })
}

const getTweet = async (_, { _id }, { user }) => {
  await requireAuth(user)
  return Tweet.findById(_id)
}

const createTweet = async (_, { text }, { user }) => {
  await requireAuth(user)
  const tweet = await Tweet.create({ text, user: user._id })
  pubsub.publish(TWEET_ADDED, { [TWEET_ADDED]: tweet })
  return tweet
}

const updateTweet = async (_, { _id, ...rest }, { user }) => {
  await requireAuth(user)
  const tweet = await Tweet.findByIdAndUpdate({ _id, user: user._id })
  if (!tweet) {
    throw new Error('Tweet not found')
  }
  Object.entries(rest).forEach(([key, value]) => {
    tweet[key] = value
  })
  return tweet.save()
}

const deleteTweet = async (_, { _id }, { user }) => {
  await requireAuth(user)
  return Tweet.findByIdAndDelete(_id)
}

const favoriteTweet = async (_, { _id }, { user }) => {
  await requireAuth(user)
  const favorites = await FavoriteTweet.findOne({ userId: user._id })
  return await favorites.userFavoritedTweet(_id)
}

export default {
  Query: {
    getTweets,
    getTweet,
    getUserTweets
  },
  Mutation: {
    createTweet,
    updateTweet,
    deleteTweet,
    favoriteTweet
  },
  Tweet: {
    user: async ({ user }) => await User.findById(user._id)
  },
  Subscription: {
    tweetAdded: {
      subscribe: () => pubsub.asyncIterator(TWEET_ADDED)
    },
    tweetFavorited: {
      subscribe: () => pubsub.asyncIterator(TWEET_FAVORITED)
    }
  }
}

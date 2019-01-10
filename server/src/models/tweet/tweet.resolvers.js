import Tweet from '../tweet/tweet.model'
import User from '../user/user.model'
import { requireAuth } from '../../utils/auth'

const getTweets = async (_, args, { user }) => {
  return Tweet.find({}).sort({ createdAt: -1 })
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
  return Tweet.create({ text, user: user._id })
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

export default {
  Query: {
    getTweets,
    getTweet,
    getUserTweets
  },
  Mutation: {
    createTweet,
    updateTweet,
    deleteTweet
  },
  Tweet: {
    user: async ({ user }) => await User.findById(user._id)
  }
}

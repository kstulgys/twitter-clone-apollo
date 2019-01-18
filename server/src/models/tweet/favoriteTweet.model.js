import mongoose, { Schema } from 'mongoose'
import Tweet from './tweet.model'
const ObjectId = require('mongoose').Types.ObjectId
import { pubsub } from '../../server'

const TWEET_FAVORITED = 'tweetFavorited'

const favoriteTweetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tweet'
    }
  ]
})

ObjectId.prototype.valueOf = function() {
  return this.toString()
}

favoriteTweetSchema.methods = {
  async userFavoritedTweet(tweetId) {
    if (this.tweets.some(t => t.equals(tweetId))) {
      this.tweets.pull(tweetId)
      await this.save()
      const tweet = await Tweet.decFavoriteCount(tweetId)
      const t = tweet.toJSON()
      pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: { ...t } })

      return {
        isFavorited: false,
        ...t
      }
    }

    const tweet = await Tweet.incFavoriteCount(tweetId)
    const t = tweet.toJSON()
    this.tweets.push(tweetId)
    await this.save()
    pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: { ...t } })

    return {
      isFavorited: true,
      ...t
    }
  }
}

favoriteTweetSchema.index({ userId: 1 }, { unique: true })

export default mongoose.model('favoriteTweet', favoriteTweetSchema)

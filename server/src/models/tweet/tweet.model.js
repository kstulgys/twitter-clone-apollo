import mongoose, { Schema } from 'mongoose'
const ObjectId = require('mongoose').Types.ObjectId

const tweetSchema = new Schema(
  {
    text: {
      type: String,
      minlength: [5, 'Text need to be longer'],
      maxlength: [144, 'Text too long']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    favoriteCount: { type: Number, default: 0 }
  },
  { timestamps: true }
)

ObjectId.prototype.valueOf = function() {
  return this.toString()
}

tweetSchema.statics = {
  incFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(
      tweetId,
      { $inc: { favoriteCount: 1 } },
      { new: true }
    )
  },
  decFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(
      tweetId,
      { $inc: { favoriteCount: -1 } },
      { new: true }
    )
  }
}

export default mongoose.model('tweet', tweetSchema)

import mongoose, { Schema } from 'mongoose'
const ObjectId = require('mongoose').Types.ObjectId

const tweetSchema = new Schema(
  {
    text: { type: String },
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

export default mongoose.model('tweet', tweetSchema)

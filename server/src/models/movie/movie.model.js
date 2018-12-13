import mongoose, { Schema } from "mongoose"

const movieSchema = new Schema(
  {
    watched: [{ type: Number }],
    watchLater: [{ type: Number }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
)

// movieSchema.statics = {
// 	incFavoriteCount(tweetId) {
// 		return this.findByIdAndUpdate(
// 			tweetId,
// 			{ $inc: { favoriteCount: 1 } },
// 			{ new: true }
// 		)
// 	},
// 	decFavoriteCount(tweetId) {
// 		return this.findByIdAndUpdate(
// 			tweetId,
// 			{ $inc: { favoriteCount: -1 } },
// 			{ new: true }
// 		)
// 	}
// }

export default mongoose.model("movie", movieSchema)

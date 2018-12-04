const mongoose = require("mongoose");

// const findMoviesById = async ids => {
//   const res = ids.map(id => {
//     return this.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)
//   })
//   return await Promise.all(res)
// }

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String },
    avatar: { type: String },
    about: { type: String },
    watched: [{ type: Number }],
    watchLater: [{ type: Number }]
  },
  { timestamps: true, strict: true }
);

// UserSchema.virtual('watchLaterMovies').get(function() {
//   console.log('in virtual###################')
//   // const watched = await findMoviesById(this.watched)
//   return findMoviesById(this.watchLater)
// })

module.exports = { User: mongoose.model("user", UserSchema) };

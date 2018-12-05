const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    name: { type: String },
    avatar: { type: String },
    about: { type: String },
    watched: [{ type: Number }],
    watchLater: [{ type: Number }],
  },
  { timestamps: true, strict: true },
)

module.exports = { User: mongoose.model('user', UserSchema) }

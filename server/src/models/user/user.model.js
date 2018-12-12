import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String },
    avatar: { type: String },
    about: { type: String },
    watched: [{ type: Number }],
    watchLater: [{ type: Number }],
  },
  { timestamps: true, strict: true },
)

userSchema.pre('save', function(next) {
  if (!this.isModified('email')) {
    return next()
  }
  this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`
  next()
})

export const User = mongoose.model('user', userSchema)

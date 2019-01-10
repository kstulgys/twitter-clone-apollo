import mongoose, { Schema } from 'mongoose'
const ObjectId = require('mongoose').Types.ObjectId
import { hashSync, compareSync } from 'bcrypt-nodejs'
import config from '../../config'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: String,
    avatar: String,
    password: String,
    email: String
  },
  { timestamps: true }
)

ObjectId.prototype.valueOf = function() {
  return this.toString()
}

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password)
  }
  return next()
})

userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password)
  },
  authenticateUser(password) {
    return compareSync(password, this.password)
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      config.jwt
    )
  }
}

export default mongoose.model('user', userSchema)

// if (this.isModified('email')) {
//   this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`
// }

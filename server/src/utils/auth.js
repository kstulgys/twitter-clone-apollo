import User from '../models/user/user.model'
import { AuthenticationError } from 'apollo-server'
import config from '../config'
import jwt from 'jsonwebtoken'

const decodeToken = async token => {
  const decoded = await jwt.verify(token, config.jwt)
  if (!decoded._id) {
    throw new Error('Token is not valid')
  }
  return decoded
}

export const requireAuth = async user => {
  if (!user) {
    throw new AuthenticationError()
  }
}

export const authenticate = async req => {
  const token = (req.headers && req.headers.authorization) || ''
  let decoded
  if (token) {
    decoded = await decodeToken(token)
  }
  //// console.log(decoded)
  return await User.findById(decoded)
}

//? import cuid from 'cuid'

// export const newApiKey = () => {
//   return cuid()
// }

// export const authenticate = async req => {
//   const userEmail = req.headers.authorization

//   if (!userEmail) {
//     return
//   }

//   const user = await User.findOne({ apiKey })
//     .select('-password')
//     .lean()
//     .exec()

//   return user
// }

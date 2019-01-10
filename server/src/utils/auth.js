import User from '../models/user/user.model'
import { AuthenticationError } from 'apollo-server'
import config from '../config'
import jwt from 'jsonwebtoken'

const decodeToken = token => {
  const [first, second] = token.split(' ')
  if (first === 'Bearer' && second) {
    return jwt.verify(second, config.jwt)
  }
  throw new Error('Token is not valid')
}

export const requireAuth = async user => {
  if (!user) {
    throw new AuthenticationError()
  }
}

export const authenticate = async req => {
  const token = (req.headers && req.headers.autorization) || ''
  let userId
  if (token) {
    userId = await decodeToken(token)
  }
  return await User.findById(userId)
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

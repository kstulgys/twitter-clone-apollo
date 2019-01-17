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
  const headersToken = req && req.headers && req.headers.authorization
  // console.log('headersToken', headersToken)
  const contextToken = req && req.context && req.context.authorization
  // console.log('contextToken', contextToken)
  const token = headersToken ? headersToken : contextToken
  const userToken = token ? token : ''
  // console.log('token is this', userToken)

  const decodedUserId = await decodeToken(userToken)
  return await User.findById(decodedUserId)
}

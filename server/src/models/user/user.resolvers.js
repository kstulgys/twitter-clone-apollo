import User from './user.model'
import FavoriteTweet from '../tweet/favoriteTweet.model'
import { requireAuth } from '../../utils/auth'

const getUsers = async (_, args) => {
  return await User.find({})
}

const signup = async (_, { email, username, password }) => {
  const userWithUsername = await User.findOne({ username })
  const userWithEmail = await User.findOne({ email })

  if (userWithUsername) {
    throw new Error('username is taken')
  }

  if (userWithEmail) {
    throw new Error('email is taken, please login')
  }

  const user = await User.create({ email, username, password })
  await FavoriteTweet.create({ userId: user._id })
  return { token: await user.createToken() }
}

const login = async (_, { email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User does not exist')
  }
  if (!user.authenticateUser(password)) {
    throw new Error('Password does not match')
  }
  return {
    token: await user.createToken()
  }
}

const me = async (_, args, { user }) => {
  await requireAuth(user)
  return user
}

export default {
  Query: {
    me,
    getUsers
  },
  Mutation: {
    signup,
    login
  }
}

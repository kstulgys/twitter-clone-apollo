import { User } from './user.model'
import { AuthenticationError } from 'apollo-server'
// import { newApiKey } from '../../utils/auth'

const me = async (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return await ctx.user
}

const listUsers = async (_, args) => {
  return await User.find({})
    .lean()
    .exec()
}

const addWatched = async (_, { id }, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  await User.findByIdAndUpdate(ctx.user._id, { $pull: { watchLater: id }, $addToSet: { watched: id } }, { new: true })
    .lean()
    .exec()
  return id
}

const addWatchLater = async (_, { id }, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  await User.findByIdAndUpdate(ctx.user._id, { $pull: { watched: id }, $addToSet: { watchLater: id } }, { new: true })
  return id
}

const removeWatched = async (_, { id }, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  await User.findByIdAndUpdate(ctx.user._id, { $pull: { watched: id } }, { new: true })
  return id
}

const removeWatchLater = async (_, { id }, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  await User.findByIdAndUpdate(ctx.user._id, { $pull: { watchLater: id } }, { new: true })
  return id
}

const login = async (_, { email }) => {
  let user
  user = await User.findOne({ email })
  if (!user) {
    user = await User.create({ email })
  }
  return new Buffer(email).toString('base64')
}

export default {
  Query: {
    me,
    listUsers,
  },
  Mutation: {
    login,
    addWatched,
    addWatchLater,
    removeWatched,
    removeWatchLater,
  },
}

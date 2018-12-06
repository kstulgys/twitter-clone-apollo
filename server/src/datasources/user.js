const { DataSource } = require('apollo-datasource')
const isEmail = require('isemail')
const { AuthenticationError } = require('apollo-server')
const createStore = require('../models')

class UserAPI extends DataSource {
  constructor() {
    super()
    this.store = createStore()
  }

  async getCurrentUser({ user }) {
    return await this.store.User.findById(user._id)
  }

  // get current user from the context or throw error
  getUserOrThrowAuthError() {
    const user = this.getCurrentUser()
    if (!user) throw new AuthenticationError('Sorry, you are not authenticated :(, please log in!')
    return user
  }

  // get all users from the database
  async getAllUsers() {
    return await this.store.User.find()
  }

  async getWatchedByUsers(id) {
    return await this.store.User.find({ watched: { $in: [id] } })
  }

  // get current user from the context or create a new user in the database
  async findOrCreateUser(email) {
    let user = this.getCurrentUser()
    if (user) return user
    if (!email || !isEmail.validate(email)) throw new Error('Sorry, this email is not valid! :(')
    user = await this.store.User.findOneAndUpdate({ email }, { email }, { upsert: true, new: true })
    return user && user
  }

  // only the authenticated user can perform the following actions otherwise an error will be thrown
  async addToWatched(id) {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findByIdAndUpdate(
      user._id,
      { $pull: { watchLater: id }, $addToSet: { watched: id } },
      { new: true },
    )
  }

  async addToWatchLater(id) {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findByIdAndUpdate(
      user._id,
      { $pull: { watched: id }, $addToSet: { watchLater: id } },
      { new: true },
    )
  }

  async getWatchedIds() {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findById(user._id).select('watched')
  }

  async getWatchListIds() {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findById(user._id).select('watchList')
  }

  async deleteWatchedId(id) {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findByIdAndUpdate(user._id, { $pull: { watched: id } }, { new: true })
  }

  async deleteWatchLaterId(id) {
    const user = this.getUserOrThrowAuthError()
    return await this.store.User.findByIdAndUpdate(user._id, { $pull: { watchLater: id } }, { new: true })
  }
}

module.exports = UserAPI

//   async bookTrips({ launchIds }) {
//     const userId = this.context.user.id
//     if (!userId) return

//     let results = []

//     // for each launch id, try to book the trip and add it to the results array
//     // if successful
//     for (const launchId of launchIds) {
//       const res = await this.bookTrip({ launchId })
//       if (res) results.push(res)
//     }

//     return results
//   }

//   async bookTrip({ launchId }) {
//     const userId = this.context.user.id
//     const res = await this.store.trips.findOrCreate({
//       where: { userId, launchId },
//     })
//     return res && res.length ? res[0].get() : false
//   }

//   async cancelTrip({ launchId }) {
//     const userId = this.context.user.id
//     return !!this.store.trips.destroy({ where: { userId, launchId } })
//   }

//   async getLaunchIdsByUser() {
//     const userId = this.context.user.id
//     const found = await this.store.trips.findAll({
//       where: { userId },
//     })
//     return found && found.length ? found.map(l => l.dataValues.launchId).filter(l => !!l) : []
//   }

//   async isBookedOnLaunch({ launchId }) {
//     if (!this.context || !this.context.user) return false
//     const userId = this.context.user.id
//     const found = await this.store.trips.findAll({
//       where: { userId, launchId },
//     })
//     return found && found.length > 0
//   }

// const mongoose = require('mongoose')
// const ObjectId = require('mongoose').Types.ObjectId
// const User = require('./user')

// ObjectId.prototype.valueOf = function() {
//   return this.toString()
// }

// const createStore = () => {
//   mongoose.connect(
//     process.env.MONGO_DB,
//     { useNewUrlParser: true },
//   )
//   mongoose.Promise = global.Promise
//   const db = mongoose.connection
//   db.on('error', console.error.bind(console, 'MongoDB connection error'))

//   return { User }
// }

// module.exports = createStore

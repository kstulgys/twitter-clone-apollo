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

UserSchema.post('save', function(doc, next) {
  doc.update({ avatar: `https://api.adorable.io/avatars/285/${doc.email}.io.png` })
})

const User = mongoose.model('user', UserSchema)
module.exports = User

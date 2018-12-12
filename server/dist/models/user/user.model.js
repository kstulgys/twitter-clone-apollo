'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose2.default.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String },
  avatar: { type: String },
  about: { type: String },
  watched: [{ type: Number }],
  watchLater: [{ type: Number }]
}, { timestamps: true, strict: true });

userSchema.pre('save', function (next) {
  if (!this.isModified('email')) {
    return next();
  }
  this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`;
  next();
});

const User = exports.User = _mongoose2.default.model('user', userSchema);
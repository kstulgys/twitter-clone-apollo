'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ObjectId = require('mongoose').Types.ObjectId;


const userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (() => {
        var _ref = _asyncToGenerator(function* (username) {
          return yield User.where({ username });
        });

        return function validator(_x) {
          return _ref.apply(this, arguments);
        };
      })(),
      message: ({ value }) => `User name ${value}, has already been taken`
    }
  },
  avatar: String,
  password: String,
  email: String,
  followingsCount: {
    type: Number,
    default: 0
  },
  followersCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

userSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({
      _id: this._id
    }, _config2.default.jwt);
  }
};

const User = _mongoose2.default.model('user', userSchema);
exports.default = User;

// if (this.isModified('email')) {
//   this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`
// }
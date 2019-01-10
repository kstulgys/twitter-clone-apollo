'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = exports.requireAuth = undefined;

var _user = require('../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _apolloServer = require('apollo-server');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const decodeToken = token => {
  const [first, second] = token.split(' ');
  if (first === 'Bearer' && second) {
    return _jsonwebtoken2.default.verify(second, _config2.default.jwt);
  }
  throw new Error('Token is not valid');
};

const requireAuth = exports.requireAuth = (() => {
  var _ref = _asyncToGenerator(function* (user) {
    if (!user) {
      throw new _apolloServer.AuthenticationError();
    }
  });

  return function requireAuth(_x) {
    return _ref.apply(this, arguments);
  };
})();

const authenticate = exports.authenticate = (() => {
  var _ref2 = _asyncToGenerator(function* (req) {
    const token = req.headers && req.headers.autorization || '';
    let userId;
    if (token) {
      userId = yield decodeToken(token);
    }
    return yield _user2.default.findById(userId);
  });

  return function authenticate(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

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
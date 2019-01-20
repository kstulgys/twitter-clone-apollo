'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _favoriteTweet = require('../tweet/favoriteTweet.model');

var _favoriteTweet2 = _interopRequireDefault(_favoriteTweet);

var _auth = require('../../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getUsers = (() => {
  var _ref = _asyncToGenerator(function* (_, args) {
    return yield _user2.default.find({});
  });

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const signup = (() => {
  var _ref2 = _asyncToGenerator(function* (_, { email, username, password }) {
    const userWithUsername = yield _user2.default.findOne({ username });
    const userWithEmail = yield _user2.default.findOne({ email });

    if (userWithUsername) {
      throw new Error('username is taken');
    }

    if (userWithEmail) {
      throw new Error('email is taken, please login');
    }

    const user = yield _user2.default.create({ email, username, password });
    yield _favoriteTweet2.default.create({ userId: user._id });
    return { token: yield user.createToken() };
  });

  return function signup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const login = (() => {
  var _ref3 = _asyncToGenerator(function* (_, { email, password }) {
    const user = yield _user2.default.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    if (!user.authenticateUser(password)) {
      throw new Error('Password does not match');
    }
    return {
      token: yield user.createToken()
    };
  });

  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const me = (() => {
  var _ref4 = _asyncToGenerator(function* (_, args, { user }) {
    yield (0, _auth.requireAuth)(user);
    return user;
  });

  return function me(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    me,
    getUsers
  },
  Mutation: {
    signup,
    login
  }
};
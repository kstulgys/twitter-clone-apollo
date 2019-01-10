'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweet = require('../tweet/tweet.model');

var _tweet2 = _interopRequireDefault(_tweet);

var _user2 = require('../user/user.model');

var _user3 = _interopRequireDefault(_user2);

var _auth = require('../../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getTweets = (() => {
  var _ref = _asyncToGenerator(function* (_, args, { user }) {
    return _tweet2.default.find({}).sort({ createdAt: -1 });
  });

  return function getTweets(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const getUserTweets = (() => {
  var _ref2 = _asyncToGenerator(function* (_, args, { user }) {
    return _tweet2.default.find({ user: user._id }).sort({ createdAt: -1 });
  });

  return function getUserTweets(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

const getTweet = (() => {
  var _ref3 = _asyncToGenerator(function* (_, { _id }, { user }) {
    yield (0, _auth.requireAuth)(user);
    return _tweet2.default.findById(_id);
  });

  return function getTweet(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

const createTweet = (() => {
  var _ref4 = _asyncToGenerator(function* (_, { text }, { user }) {
    yield (0, _auth.requireAuth)(user);
    return _tweet2.default.create({ text, user: user._id });
  });

  return function createTweet(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();

const updateTweet = (() => {
  var _ref5 = _asyncToGenerator(function* (_, _ref6, { user }) {
    let { _id } = _ref6,
        rest = _objectWithoutProperties(_ref6, ['_id']);

    yield (0, _auth.requireAuth)(user);
    const tweet = yield _tweet2.default.findByIdAndUpdate({ _id, user: user._id });
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    Object.entries(rest).forEach(function ([key, value]) {
      tweet[key] = value;
    });
    return tweet.save();
  });

  return function updateTweet(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
})();

const deleteTweet = (() => {
  var _ref7 = _asyncToGenerator(function* (_, { _id }, { user }) {
    yield (0, _auth.requireAuth)(user);
    return _tweet2.default.findByIdAndDelete(_id);
  });

  return function deleteTweet(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    getTweets,
    getTweet,
    getUserTweets
  },
  Mutation: {
    createTweet,
    updateTweet,
    deleteTweet
  },
  Tweet: {
    user: (() => {
      var _ref8 = _asyncToGenerator(function* ({ user: _user }) {
        return yield _user3.default.findById(_user._id);
      });

      return function user(_x19) {
        return _ref8.apply(this, arguments);
      };
    })()
  }
};
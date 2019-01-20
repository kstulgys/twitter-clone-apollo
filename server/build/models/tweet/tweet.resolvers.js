'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tweet = require('./tweet.model');

var _tweet2 = _interopRequireDefault(_tweet);

var _favoriteTweet = require('./favoriteTweet.model');

var _favoriteTweet2 = _interopRequireDefault(_favoriteTweet);

var _user2 = require('../user/user.model');

var _user3 = _interopRequireDefault(_user2);

var _auth = require('../../utils/auth');

var _server = require('../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const TWEET_ADDED = 'tweetAdded';
const TWEET_FAVORITED = 'tweetFavorited';

const getTweets = (() => {
  var _ref = _asyncToGenerator(function* (_, args, { user }) {
    yield (0, _auth.requireAuth)(user);
    const p1 = _tweet2.default.find({}).sort({ createdAt: -1 });
    const p2 = _favoriteTweet2.default.findOne({ userId: user._id });

    const [tweets, favorites] = yield Promise.all([p1, p2]);
    const tweetsToSend = yield tweets.reduce(function (arr, tweet) {
      const tw = tweet.toJSON();
      if (favorites.tweets.some(function (t) {
        return t.equals(tw._id);
      })) {
        arr.push(_extends({}, tw, {
          isFavorited: true
        }));
      } else {
        arr.push(_extends({}, tw, {
          isFavorited: false
        }));
      }
      return arr;
    }, []);
    return tweetsToSend;
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
    const tweet = yield _tweet2.default.create({ text, user: user._id });
    _server.pubsub.publish(TWEET_ADDED, { [TWEET_ADDED]: tweet });
    return tweet;
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

const favoriteTweet = (() => {
  var _ref8 = _asyncToGenerator(function* (_, { _id }, { user }) {
    yield (0, _auth.requireAuth)(user);
    const favorites = yield _favoriteTweet2.default.findOne({ userId: user._id });
    return yield favorites.userFavoritedTweet(_id);
  });

  return function favoriteTweet(_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
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
    deleteTweet,
    favoriteTweet
  },
  Tweet: {
    user: (() => {
      var _ref9 = _asyncToGenerator(function* ({ user: _user }) {
        return yield _user3.default.findById(_user._id);
      });

      return function user(_x22) {
        return _ref9.apply(this, arguments);
      };
    })()
  },
  Subscription: {
    tweetAdded: {
      subscribe: () => _server.pubsub.asyncIterator(TWEET_ADDED)
    },
    tweetFavorited: {
      subscribe: () => _server.pubsub.asyncIterator(TWEET_FAVORITED)
    }
  }
};
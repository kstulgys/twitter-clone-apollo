'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _tweet = require('./tweet.model');

var _tweet2 = _interopRequireDefault(_tweet);

var _server = require('../../server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ObjectId = require('mongoose').Types.ObjectId;


const TWEET_FAVORITED = 'tweetFavorited';

const favoriteTweetSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tweets: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'tweet'
  }]
});

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

favoriteTweetSchema.methods = {
  userFavoritedTweet(tweetId) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.tweets.some(function (t) {
        return t.equals(tweetId);
      })) {
        _this.tweets.pull(tweetId);
        yield _this.save();
        const tweet = yield _tweet2.default.decFavoriteCount(tweetId);
        const t = tweet.toJSON();
        _server.pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: _extends({}, t) });

        return _extends({
          isFavorited: false
        }, t);
      }

      const tweet = yield _tweet2.default.incFavoriteCount(tweetId);
      const t = tweet.toJSON();
      _this.tweets.push(tweetId);
      yield _this.save();
      _server.pubsub.publish(TWEET_FAVORITED, { [TWEET_FAVORITED]: _extends({}, t) });

      return _extends({
        isFavorited: true
      }, t);
    })();
  }
};

favoriteTweetSchema.index({ userId: 1 }, { unique: true });

exports.default = _mongoose2.default.model('favoriteTweet', favoriteTweetSchema);
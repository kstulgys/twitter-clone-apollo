'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = require('mongoose').Types.ObjectId;

const tweetSchema = new _mongoose.Schema({
  text: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [500, 'Text too long']
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  favoriteCount: { type: Number, default: 0 }
}, { timestamps: true });

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

tweetSchema.statics = {
  incFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favoriteCount: 1 } }, { new: true });
  },
  decFavoriteCount(tweetId) {
    return this.findByIdAndUpdate(tweetId, { $inc: { favoriteCount: -1 } }, { new: true });
  }
};

exports.default = _mongoose2.default.model('tweet', tweetSchema);
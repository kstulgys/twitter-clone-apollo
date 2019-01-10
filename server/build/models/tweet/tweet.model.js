'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = require('mongoose').Types.ObjectId;

const tweetSchema = new _mongoose.Schema({
  text: { type: String },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  favoriteCount: { type: Number, default: 0 }
}, { timestamps: true });

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

exports.default = _mongoose2.default.model('tweet', tweetSchema);
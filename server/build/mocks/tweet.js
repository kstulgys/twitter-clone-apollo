'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweet = require('../models/tweet/tweet.model');

var _tweet2 = _interopRequireDefault(_tweet);

var _user = require('../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _favoriteTweet = require('../models/tweet/favoriteTweet.model');

var _favoriteTweet2 = _interopRequireDefault(_favoriteTweet);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator(function* () {
  yield _tweet2.default.deleteMany();
  yield _user2.default.deleteMany();
  yield _favoriteTweet2.default.deleteMany();

  yield Array(10).fill(null).forEach((() => {
    var _ref2 = _asyncToGenerator(function* (i) {
      const user = yield _user2.default.create({
        username: _faker2.default.internet.userName(),
        email: _faker2.default.internet.email(),
        password: _faker2.default.internet.password(),
        avatar: _faker2.default.internet.avatar()
      });
      yield _favoriteTweet2.default.create({ userId: user._id });
      yield Array(10).fill(null).forEach(_asyncToGenerator(function* () {
        yield _tweet2.default.create({
          text: _faker2.default.lorem.paragraphs(1),
          user: user._id,
          favoriteCount: _faker2.default.random.number()
        });
      }));
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());
});
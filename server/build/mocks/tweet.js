'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweet = require('../models/tweet/tweet.model');

var _tweet2 = _interopRequireDefault(_tweet);

var _user = require('../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator(function* () {
  try {
    yield _tweet2.default.deleteMany();
    yield _user2.default.deleteMany();

    yield Array.from({ length: 5 }).forEach((() => {
      var _ref2 = _asyncToGenerator(function* (_, i) {
        const user = yield _user2.default.create({
          username: _faker2.default.internet.userName(),
          email: _faker2.default.internet.email(),
          password: _faker2.default.internet.password(),
          avatar: `https://randomuser.me/api/portraits/med/men/${i}.jpg`
        });
        yield Array.from({ length: 5 }).forEach(_asyncToGenerator(function* () {
          yield _tweet2.default.create({ text: _faker2.default.lorem.paragraphs(1), user: user._id });
        }));
      });

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    })());
  } catch (error) {
    throw error;
  }
});
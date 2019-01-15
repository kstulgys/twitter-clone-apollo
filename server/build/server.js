'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _apolloServer = require('apollo-server');

var _db = require('./db');

var _lodash = require('lodash');

var _auth = require('./utils/auth');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _tweet = require('./models/tweet/tweet.schema');

var _tweet2 = _interopRequireDefault(_tweet);

var _user = require('./models/user/user.schema');

var _user2 = _interopRequireDefault(_user);

var _tweet3 = require('./models/tweet/tweet.resolvers');

var _tweet4 = _interopRequireDefault(_tweet3);

var _user3 = require('./models/user/user.resolvers');

var _user4 = _interopRequireDefault(_user3);

var _tweet5 = require('./mocks/tweet');

var _tweet6 = _interopRequireDefault(_tweet5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();
const start = exports.start = (() => {
  var _ref = _asyncToGenerator(function* () {
    const rootSchema = _apolloServer.gql`
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
    type Subscription {
      _: Boolean
    }
  `;
    const server = new _apolloServer.ApolloServer({
      typeDefs: [rootSchema, _user2.default, _tweet2.default],
      resolvers: (0, _lodash.merge)({}, _user4.default, _tweet4.default),
      context({ req, connection }) {
        return _asyncToGenerator(function* () {
          let user = {};

          if (connection) {
            const re = connection.context.authorization;
            user = yield (0, _auth.authenticate)(connection);
          } else {
            user = yield (0, _auth.authenticate)(req);
          }
          return { user };
        })();
      }
      // introspection: true
    });

    yield (0, _db.connect)(_config2.default.dbUrl);
    // await createFakeTweets()
    const { url } = yield server.listen({
      port: process.env.PORT || _config2.default.port
      // port: process.env.PORT || config.port
    });

    console.log(`GQL server ready at ${url}`);
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();
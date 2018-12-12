"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _apolloServer = require("apollo-server");

var _db = require("./db");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _auth = require("./utils/auth");

var _user = require("./models/user/user.schema");

var _user2 = _interopRequireDefault(_user);

var _user3 = require("./models/user/user.resolvers");

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("dotenv").config();


// import typeDefs from './schema'
// import resolvers from './resolvers'
// import MovieAPI from './datasources/movie'
// import UserAPI from './datasources/user'
// const store = createStore()
// set up any dataSources our resolvers need
// const dataSources = () => ({
//   movieAPI: new MovieAPI(),
//   userAPI: new UserAPI(),
// })

const start = exports.start = (() => {
  var _ref = _asyncToGenerator(function* () {
    // const rootSchema = `
    //   schema {
    //     query: Query
    //     mutation: Mutation
    //   }
    // `
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
      typeDefs: [rootSchema, _user2.default],
      resolvers: _user4.default,
      // dataSources,
      context({ req }) {
        return _asyncToGenerator(function* () {
          const user = yield (0, _auth.authenticate)(req);
          return { user };
        })();
      },
      introspection: true
    });

    yield (0, _db.connect)(_config2.default.dbUrl);
    const { url } = yield server.listen({ port: _config2.default.port });

    console.log(`GQL server ready at ${url}`);
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();
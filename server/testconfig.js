const mongoose = require("mongoose");
const url = "mongodb://tmdb:tmdb123@ds157349.mlab.com:57349/tmdb-apollo-dev";
mongoose.Promise = global.Promise;
// const cuid = require("cuid");

const connect = url =>
  mongoose.connect(
    url,
    {
      useNewUrlParser: true
    }
  );

global.newId = () => {
  return mongoose.Types.ObjectId();
};

beforeEach(async done => {
  // const db = cuid();
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await connect(url);
      clearDB();
    } catch (e) {
      throw e;
    }
  } else {
    clearDB();
  }
});
afterEach(done => {
  mongoose.disconnect();
  return done();
});
afterAll(done => {
  return done();
});

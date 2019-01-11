'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();

const config = exports.config = {
  port: process.env.PORT || 4000,
  jwt: 'helloworld',
  jwtExp: '100d',
  dbUrl: 'mongodb://twitter:twitter123@ds139934.mlab.com:39934/twitter-clone-apollo'
};